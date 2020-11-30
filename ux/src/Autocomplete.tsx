import React, { Component } from "react";
import { Form, FormGroup, FormControl, Dropdown, Button } from 'react-bootstrap';

interface IAutocompleteProps {
  svcurl: string;
}

interface IAutocompleteState {
  activeOption: number;
  filteredOptions: string[];
  showOptions: boolean;
  userInput: string;
}

interface IAutocompleteSvcData {
  status: string;
  msg: string;
  results: string[];
}

interface IAutocompleteSvcCallbackProps {
  svccallnum: number;
  q: string;
  data: IAutocompleteSvcData;
}

interface IAutocompleteSvcProps {
  svcurl: string;
  svccallnum: number;
  q: string;
  callback: (_: IAutocompleteSvcCallbackProps) => void;
}

class Autocomplete extends Component<IAutocompleteProps, IAutocompleteState> {

  private buttonRef: React.RefObject<HTMLButtonElement>;
  private svccallcount: number = 0;

  constructor(props: any) {
    super(props);
    this.buttonRef = React.createRef();
    this.state = {
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: ''
    };
  }

  private callSvcURL = (autocompleteSvcProps: IAutocompleteSvcProps) => {
    fetch(autocompleteSvcProps.svcurl + '?q=' + encodeURIComponent(autocompleteSvcProps.q))
    .then(res => res.json())
    .then(data => {
      const autocompleteSvcCallbackProps: IAutocompleteSvcCallbackProps = {
        q: autocompleteSvcProps.q,
        svccallnum: autocompleteSvcProps.svccallnum,
        data: data
      }
      autocompleteSvcProps.callback(autocompleteSvcCallbackProps);
    })
    .catch(error => {
      console.log(error);
      const autocompleteSvcCallbackProps: IAutocompleteSvcCallbackProps = {
        svccallnum: autocompleteSvcProps.svccallnum,
        q: autocompleteSvcProps.q,
        data: {
          status: 'error',
          msg: 'Fetch failed.',
          results: []
        }
      }
      autocompleteSvcProps.callback(autocompleteSvcCallbackProps);
    });
  }

  private svcCallback = (autocompleteSvcCallbackProps: IAutocompleteSvcCallbackProps) => {

    // Skip callback processing unless this run has results for the most recent call made so far:
    if (this.svccallcount !== autocompleteSvcCallbackProps.svccallnum) return;

    let filteredOptions: string[] = [];
    if ('success' === (autocompleteSvcCallbackProps.data.status || '')) {
      filteredOptions = autocompleteSvcCallbackProps.data.results || [];
    }
    this.setState({
      activeOption: 0,
      filteredOptions: filteredOptions,
      showOptions: (0 < filteredOptions.length),
      userInput: autocompleteSvcCallbackProps.q
    });
    if (this.buttonRef.current) this.buttonRef.current.click();
  };

  private onChange = (e: { currentTarget: { value: any } }) => {
    const userInput: string = e.currentTarget.value || '';
    if (0 < userInput.length) {
      const svcurl: string = this.props.svcurl || '';
      this.svccallcount++;
      const autocompleteSvcProps: IAutocompleteSvcProps = {
        svcurl: svcurl,
        svccallnum: this.svccallcount,
        q: userInput,
        callback: this.svcCallback
      };
      this.callSvcURL(autocompleteSvcProps);
    }
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: userInput
    });
  };
 
  private onClick = (e: any) => {
    this.setState({
      activeOption: 0,
      filteredOptions: [],
      showOptions: false,
      userInput: e.currentTarget.innerText
    });
  };
 
  private onTextInputKeyDown = (e: { keyCode: number, preventDefault: () => void}) => {
    const { activeOption, filteredOptions } = this.state;
    if (0 < filteredOptions.length) {
      if (e.keyCode === 13) {
        this.setState({
          activeOption: 0,
          filteredOptions: [],
          showOptions: false,
          userInput: filteredOptions[activeOption]
        });
        e.preventDefault();
      }
      else if (e.keyCode === 38) {
        if (0 < activeOption) {
          this.setState({ activeOption: activeOption - 1 });
        }
        e.preventDefault();
      }
      else if (e.keyCode === 40) {
        if ((activeOption + 1) < filteredOptions.length) {
          this.setState({ activeOption: activeOption + 1 });
        }
        e.preventDefault();
      }
    }
  };

  private onMenuKeyDown = (e: { keyCode: number }) => {
    const { activeOption, filteredOptions } = this.state;
    if (e.keyCode === 38) {
      if (0 < activeOption) {
        this.setState({ activeOption: activeOption - 1 });
      }
    }
    else if (e.keyCode === 40) {
      if ((activeOption + 1) < filteredOptions.length) {
        this.setState({ activeOption: activeOption + 1 });
      }
    }
  };

  private onMenuItemMouseEnter = (e: { target: { getAttribute: (_: string) => string } }) => {
    this.setState({ activeOption: parseInt(e.target.getAttribute('data-index'))});
  };

  private onMenuItemFocus = (e: { target: { getAttribute: (_: string) => string } }) => {
    this.setState({ activeOption: parseInt(e.target.getAttribute('data-index'))});
  };

  private onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  componentDidMount() {
  }

  render() {
    const {
      onChange,
      onClick,
      onTextInputKeyDown,
      onMenuKeyDown,
      onMenuItemMouseEnter,
      onMenuItemFocus,
      onSubmit,
      state: { activeOption, filteredOptions, showOptions, userInput }
    } = this;
 
    let optionsListComponent;
 
    if (showOptions && userInput && filteredOptions.length) {
      optionsListComponent = (
        <Dropdown>
          <Dropdown.Toggle variant="success" ref={this.buttonRef} tabIndex={-1} />
          <Dropdown.Menu onKeyDown={onMenuKeyDown}>
            {filteredOptions.map((option: {} | null | undefined, index: number) => {
              let className = '';
              if (index === activeOption) {
                className = "active";
              }
              return (
                <Dropdown.Item className={className} key={index} data-index={index} onMouseEnter={onMenuItemMouseEnter} onFocus={onMenuItemFocus} onClick={onClick}>
                  {option}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      );
    }
 
    return (
      <Form onSubmit={onSubmit}>
        <FormGroup role="form">
          <Form.Label>Search for a school class subject:</Form.Label>
          <FormControl
            type="text"
            onChange={onChange}
            onKeyDown={onTextInputKeyDown}
            value={userInput}
            className="subject-text-input"
          />
          {optionsListComponent}
        </FormGroup>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
 
export default Autocomplete;
