export const config = {
  port: process.env.PORT || 4010,
  limit_size: process.env.LIMIT_SIZE || 3145728,
  db: {
    host: process.env.DB_HOST || "3.24.161.147",
    port: 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "Minh2000@",
    database: process.env.DB_NAME || "kiness-dev",
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'Left to the Right?!?',
    expiresIn: process.env.JWT_EXPIRES_IN || '2d',
  }
};
