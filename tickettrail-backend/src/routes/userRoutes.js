const express = require("express");
const router = express.Router();

const { userSignUp, userLogIn, allUsers, singleUser, deleteUser } = require("../api/user");

router
    .post("/register", userSignUp)
    .post("/login", userLogIn)
    .get("/", allUsers)

router.route("/:userID")
    .get(singleUser)
    .delete(deleteUser)

module.exports = router;
