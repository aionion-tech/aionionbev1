const testEnvConfig = {
  DB: {
    user: "postgres",
    host: "127.0.0.1",
    database: "aionionv1_test",
    password: "Hello123",
    port: parseInt("5432"),
    uri: "postgres://postgres:Hello123@localhost:5432/aionionv1_test",
  },
  jwt: {
    secret: "secret",
  },
  SERVER: {
    PORT: process.env.PORT || 3000,
  },
};

const developmentEnvConfig = {
  DB: {
    user: "postgres",
    host: "127.0.0.1",
    database: "aionionv1_dev",
    password: "Hello123",
    port: parseInt("5432"),
    uri: "postgres://postgres:Hello123@localhost:5432/aionionv1_dev",
  },
  jwt: {
    secret: "secret",
  },
  SERVER: {
    PORT: process.env.PORT || 3000,
  },
};

const productionConfig = {
  DB: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string),
    uri: process.env.DB_URI as string,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  SERVER: {
    PORT: process.env.PORT,
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
