const { User, Reservation, Seat, Movie } = require("../db/models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const userSignUp = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(301).json({
        success: false,
        message: "User with this email already exists",
      });
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    let newUser = new User({
      name,
      password: passwordHash,
      email,
      role,
    });
    newUser = await newUser.save();
    if (newUser) {
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: newUser,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "User not created" });
    }
  } catch (err) {
    console.error("Server Error", err);
  }
};

const userLogIn = async (req, res) => {
  try {
    const secret = process.env.SECRET;
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "This email does not exist" });
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword)
      return res
        .status(400)
        .json({ success: false, message: "This password is incorrect" });

    const token = jwt.sign(
      {
        userId: user.id,
        userRole: user.role,
      },
      secret,
      { algorithm: "HS256", expiresIn: "1d" }
    );
    res
      .status(200)
      .json({ success: true, message: "Successfully logged in", token: token });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const allUsers = async (req, res) => {
  try {
    const checkReservations = await Reservation.findAll();

    const queryOption =
      checkReservations.length !== 0
        ? {
            include: [
              {
                model: Reservation,
                as: "userReservations",
                include: [
                  {
                    model: Seat,
                    as: "seat",
                  },
                  {
                    model: Movie,
                    as: "movie",
                  },
                ],
              },
            ],
          }
        : {};

    const allUsers = await User.findAll(queryOption);
    if (!allUsers || allUsers.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No users found" });
    return res.status(200).json({ success: true, users: allUsers });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const singleUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const checkReservations = await Reservation.findOne({
      where: {
        ownerId: userID,
      },
    });

    const queryOption = checkReservations
      ? {
          include: [
            {
              model: Reservation,
              as: "userReservations",
              include: [
                {
                  model: Seat,
                  as: "seat",
                },
                {
                  model: Movie,
                  as: "movie",
                },
              ],
            },
          ],
        }
      : {};

    const singleUser = await User.findByPk(userID, queryOption);
    if (!singleUser)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, user: singleUser });
  } catch (err) {
    console.error("Server Error", err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const deleteUser = await User.destroy({ where: { id: userID } });
    if (!deleteUser)
      return res
        .status(400)
        .json({ success: false, message: "User not deleted" });
    res
      .status(200)
      .json({ success: true, message: `User${userID} has been deleted` });
  } catch (err) {
    console.error("Server Error", err);
  }
};

module.exports = { userSignUp, userLogIn, allUsers, singleUser, deleteUser };
