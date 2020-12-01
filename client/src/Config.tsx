const protocol = process.env.SVC_PROTOCOL || 'http';
const hostname = process.env.SVC_HOSTNAME || 'autocomplete-svc';
const port = process.env.SVC_PORT || '9000';

const prod = {
  url: {
    BASE_API_URL: protocol + '://' + hostname + ':' + port
  }
};

const dev = {
  url: {
    BASE_API_URL: protocol + '://' + 'localhost' + ':' + port
  }
};

export const config = (process.env.NODE_ENV === 'development') ? dev : prod;
