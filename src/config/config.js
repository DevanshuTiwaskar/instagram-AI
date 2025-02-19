import dotEnv from "dotenv";
dotEnv.config(); //This will load the .env file and set the environment variables.

///_config is an object that contains all the configuration values. that can be accessed from anywhere in the application.
const _config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRES_IN,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SERCRET: process.env.API_SERCRET
};

//why we freeze the object?beacuse we don't want to change the configuration values in the application.
const config = Object.freeze(_config);

export default config;
