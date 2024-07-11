import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  database: {
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PW: process.env.POSTGRES_PW,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
  },
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    accessTokenExpiryS: 600,
    refrehTokenExpiryS: 3000,
  },
};

export default config;
