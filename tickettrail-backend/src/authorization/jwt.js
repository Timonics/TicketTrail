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
        const routeRegex = new RegExp(
          routePath
            .replace(/:[^\s/]+/g, "(\\d+)") // Match numeric IDs (PostgreSQL IDs)
            .replace(/\//g, "\\/") // Escape forward slashes
        );
        return routeRegex.test(requestPath);
      };

      const allowedUserRoutes = [
        { path: `${api}users/:userID`, method: "GET" },
        { path: `${api}movies`, method: "GET" },
        { path: `${api}movies/:movieID`, method: "GET" },
        { path: `${api}genres`, method: "GET" },
        { path: `${api}genres/:genreID`, method: "GET" },
        { path: `${api}reservations/new-reservation`, method: "POST" },
        { path: `${api}reservations/:reservationID`, method: "GET" },
        { path: `${api}reservations/:reservationID`, method: "DELETE" },
        {
          path: `${api}seats/available-seats
        
        `,
          method: "GET",
        },
      ];

      if (userRole == "user") {
        const isAllowed = allowedUserRoutes.some(
          (route) =>
            req.method == route.method && matchRoute(route.path, reqPath)
        );

        const userReservationRouteWithID = match(
          `${api}reservations/:reservationID`
        )(reqPath);

        let reservationID;
        const userReservationPathWithID = userReservationRouteWithID.path;
        if (userReservationRouteWithID.params)
          reservationID = userReservationRouteWithID.params.reservationID;

        if (reqPath === userReservationPathWithID && reservationID) {
          const reservation = await Reservation.findByPk(reservationID, {
            include: {
              model: User,
              as: "owner",
            },
          });

          if (!reservation || reservation.owner.id !== userId) {
            console.log("This user is not the owner of this reservation");
            return true;
          } else {
            console.log("This user is the owner of this reservation");
            return false;
          }
        }

        const userRoute = match(`${api}users/:userID`, { end: false })(reqPath);

        let userID;
        const userRoutePath = userRoute.path;
        if (userRoute.params) userID = userRoute.params.userID;

        if (reqPath === userRoutePath && userID) {
          const user = await User.findByPk(userID);
          if (!user || user.id !== userId) {
            console.log("This user is not the owner of this account");
            return true;
          } else {
            console.log("This user is the owner of this account");
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
