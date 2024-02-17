const testEnvConfig = {
  DB: {
    user: "postgres",
    host: "127.0.0.1",
    database: "aionionv1_test",
    password: "Hello123",
    port: parseInt("5432"),
    uri: process.env.DB_URI,
  },
  jwt: {
    JWT_SECRET: "whatever",
  },
  SERVER: {
    PORT: process.env.PORT || 3000,
  },

  GCP: {
    GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
    GCP_BUCKET_NAME: process.env.GCP_BUCKET_NAME,
    GCP_KEY: process.env.GCP_KEY,
  },
};

const developmentEnvConfig = {
  DB: {
    user: "postgres",
    host: "127.0.0.1",
    database: "aionionv1_dev",
    password: "Hello123",
    port: parseInt("5432"),
    uri: process.env.DB_URI,
  },
  jwt: {
    JWT_SECRET: "whatever",
  },
  SERVER: {
    PORT: process.env.PORT || 3000,
  },
  GCP: {
    GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
    GCP_BUCKET_NAME: process.env.GCP_BUCKET_NAME,
    GCP_KEY: process.env.GCP_KEY,
  },
};

const productionConfig = {
  DB: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    uri: process.env.DB_URI,
  },
  jwt: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
  SERVER: {
    PORT: process.env.PORT,
  },
  GCP: {
    GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
    GCP_BUCKET_NAME: process.env.GCP_BUCKET_NAME,
    GCP_KEY: process.env.GCP_KEY,
  },
};

const NODE_ENV = process.env.NODE_ENV;

export const envConfig = (() => {
  switch (NODE_ENV) {
    case "test":
      return testEnvConfig;
    case "development":
      return developmentEnvConfig;
    case "production":
      return productionConfig;
    default:
      return developmentEnvConfig;
  }
})();
