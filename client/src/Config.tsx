const protocol = process.env.REACT_APP_SVC_PROTOCOL || 'http';
const port = process.env.REACT_APP_SVC_PORT || '9000';

const prod = {
  url: {
    BASE_API_URL: protocol + '://' + (process.env.REACT_APP_SVC_HOSTNAME || 'autocomplete-svc') + ':' + port
  }
};

const dev = {
  url: {
    BASE_API_URL: protocol + '://' + (process.env.REACT_APP_SVC_HOSTNAME || 'localhost') + ':' + port
  }
};

export const config = (process.env.NODE_ENV === 'development') ? dev : prod;
