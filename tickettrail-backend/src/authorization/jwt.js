const { expressjwt: jwt } = require("express-jwt");
const { match } = require("path-to-regexp");

const { Reservation, User } = require("../db/models/index");

const dotenv = require("dotenv");
dotenv.config();

const authJwt = () => {
  const secret = process.env.SECRET;
  const api = process.env.api;
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: async (req, token) => {
      const userId = token.payload.userId;
      const userRole = token.payload.userRole;

      const reqPath = req.path;

      const matchRoute = (routePath, requestPath) => {
        const isMatched = match(routePath)(requestPath);
        return isMatched != false;
      };

      const ALLOWED_USER_ROUTES = [
        { path: `${api}users/:userID`, method: "GET" },
        { path: `${api}users/:userID`, method: "PUT" },
        { path: `${api}users/:userID`, method: "DELETE" },
        { path: `${api}movies`, method: "GET" },
        { path: `${api}movies/:movieID`, method: "GET" },
        { path: `${api}genres`, method: "GET" },
        { path: `${api}genres/:genreID`, method: "GET" },
        { path: `${api}reservations/new-reservation`, method: "POST" },
        { path: `${api}reservations/:reservationID`, method: "GET" },
        { path: `${api}reservations/:reservationID`, method: "DELETE" },
        { path: `${api}seats/available-seats`, method: "GET" },
      ];

      if (userRole == "user") {
        const isAllowed = ALLOWED_USER_ROUTES.some(
          (route) =>
            req.method == route.method && matchRoute(route.path, reqPath)
        );

        const userReservationRouteWithID = match(
          `${api}reservations/:reservationID`
        )(reqPath);

        let reservationID;
        if (userReservationRouteWithID && !reqPath.includes("new-reservation"))
          reservationID = userReservationRouteWithID.params.reservationID;

        if (reqPath === userReservationRouteWithID.path && reservationID) {
          const reservation = await Reservation.findByPk(reservationID, {
            include: {
              model: User,
              as: "owner",
            },
          });

          if (!reservation || reservation.owner.id !== userId) {
            return true;
          } else {
            return false;
          }
        }

        const userRoute = match(`${api}users/:userID`, { end: false })(reqPath);

        let userID;
        if (userRoute.params) userID = userRoute.params.userID;

        if (reqPath === userRoute.path && userID && req.method !== "GET") {
          const user = await User.findByPk(userID);
          if (!user || user.id !== userId) {
            return true;
          } else {
            return false;
          }
        }

        if (isAllowed) return false;
      }

      if (userRole == "admin") {
        return false;
      }

      return true;
    },
  }).unless({
    path: [
      { url: `${api}users/register`, method: "POST" },
      { url: `${api}users/login`, method: "POST" },
    ],
  });
};

module.exports = authJwt;
