import express from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";

const app = express();
app.use(cors());

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );
// app.use(express.json({ limit: "16kb" }));
app.use(express.json());
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
// app.use(cookieParser());

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ statusCode, message });
});

// routes import
import bookRoute from "./src/routes/book.route.js";
import userRoute from "./src/routes/user.route.js";

// routes declaration

app.use("/book", bookRoute);
app.use("/user", userRoute);

// http://localhost:8000/api/v1/users/register

export { app };
