const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");

//const { requireUser } = require("./utils");

const {
  createUser,
  getUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
} = require("../db");

const JWT_SECRET = process.env;

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send(users);
  } catch (error) {}
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    const loggedUser = await getUserByUsername(req.body.username);

    if (loggedUser) {
      res.status(401);
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    } else if (password.length < 8) {
      res.status(401);
      next({
        name: "PasswordLengthError",
        message: "Password Too Short! Must be 8 characters or longer",
      });
    } else {
      const user = await createUser({
        firstName,
        lastName,
        username,
        email,
        password,
      });

      if (!user) {
        next({
          name: "UserCreationError",
          message: "There was a problem registering you. Please try again.",
        });
      } else {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "2w" }
        );
        req.body = user;
        res.send({ user, message: "thank you for signing up", token });
      }
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please include both a username and password",
    });
  }

  try {
    const user = await getUser({ username, password });

    if (!user) {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "2w" }
      );
      req.body = user;

      res.send({ user, username, message: "you're logged in!", token });
    }
  } catch (error) {
    console.log(">>>>>", error);
    next(error);
  }
});

usersRouter.get("/me", async (req, res, next) => {
  console.log("req.user>>>>>", req.user);
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
