const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const morgan = require("morgan");
const authJwt = require("./src/authorization/jwt");

app.use(express.json());
app.use(morgan("dev"));
app.use(authJwt());

const api = process.env.api;
const PORT = process.env.PORT;

const userRouter = require("./src/routes/userRoutes");
const seatRouter = require("./src/routes/seatRoutes");
const genreRouter = require("./src/routes/genreRoutes");
const movieRouter = require("./src/routes/movieRoutes");
const reservationRouter = require("./src/routes/reservationRoutes");

app.use(`${api}users`, userRouter);
app.use(`${api}seats`, seatRouter);
app.use(`${api}genres`, genreRouter);
app.use(`${api}movies`, movieRouter);
app.use(`${api}reservations`, reservationRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
