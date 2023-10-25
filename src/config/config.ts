export const config = {
  port: process.env.PORT || 4010,
  limit_size: process.env.LIMIT_SIZE || 3145728,
  db: {
    host: process.env.DB_HOST || "118.70.52.237",
    port: 3303,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "aiacademy@",
    database: process.env.DB_NAME || "kiness-dev",
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'Left to the Right?!?',
    expiresIn: process.env.JWT_EXPIRES_IN || '2d',
  }
};
