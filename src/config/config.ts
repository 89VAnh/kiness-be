export const config = {
  port: process.env.PORT || 4010,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "Minh2000@",
    database: process.env.DB_NAME || "kiness-dev",
  },
};
