import express from "express";

//Importing routers
import taskHandlerRouter from "./task";
import userRouter from "./user";
import authRouter from "./auth";

//Creating router object
const router = express();

//Route to handle tasks
router.use("/task", taskHandlerRouter);

//Route to handle user
router.use("/user", userRouter);

//Route to handle user authentication
router.use("/auth", authRouter);

//Route for home
router.get("/", (req, res) => {
  res.json({
    msg: "Home",
  });
});

export default router;
