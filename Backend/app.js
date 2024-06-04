import express from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";

const app = express();
app.use(cors());

// routes import
import bookRoute from "./src/routes/book.route.js";
import userRoute from "./src/routes/user.route.js";

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );
app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
// app.use(cookieParser());

// routes declaration

app.use("/book", bookRoute);
app.use("/user", userRoute);

// http://localhost:8000/api/v1/users/register

export { app };
