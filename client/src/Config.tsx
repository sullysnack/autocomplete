const prod = {
  url: {
    BASE_API_URL: 'http://localhost:9000'
  }
};

const dev = {
  url: {
    BASE_API_URL: 'http://localhost:9000'
  }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
