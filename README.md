# TicketTrail

TicketTrail is a movie reservation backend system designed to handle user authentication, movie listings, seat reservations, and administrative management efficiently. It is built using Node.js, Express, and PostgreSQL, providing a scalable and robust platform for movie ticket booking.

## Features

### User Features

- **User Registration and Login:**
  - Secure registration and login using JWT authentication.
  - Password hashing using bcrypt.
- **Movie Listings:**
  - Retrieve available movies and their details.
- **Seat Availability:**
  - Check for available seats for specific showtimes.
- **Reservations:**
  - Make new reservations for movies.
  - View reservation details.
  - Cancel reservations.

### Admin Features

- **Manage Movies:**
  - Add, update, or delete movies (manage movie library).
- **Manage Genres:**
  - Add, update, or delete genres. (manage movie genres)
- **Reservation Overview:**
  - View all user reservations.
- **User Management:**
  - Add, update, or delete users. (manage user accounts)
- **Seat Management:**
  - Add, update, or delete seats. (manage theater seating)

### Security

- Role-based access control for users and administrators.
- JWT-based authentication with route protection.

## Technologies Used

- **Backend Framework:** Node.js with Express
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JSON Web Tokens (JWT)
- **Environment Management:** dotenv

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Timonics/tickettrail.git
   cd tickettrail
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following variables:

   ```env
   NODE_ENV = development
   PORT=3000
   SECRET=your_jwt_secret
   api=/api/v1/
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   DB_PORT=your_database_port
   DB_DIALECT=_database_dialect
   ```

4. Create a .sequelizerc file in the root of your project folder
    Check sequelize docs for the config 

4. Run database migrations:

   ```bash
   npx sequelize-cli db:migrate
   ```

5. Start the server:

   ```bash
   npm start

   or 

   npm run dev 
   with nodemon installed 
   ```

6. The API will be available at `http://localhost:3000` (or your specified port).

## API Endpoints

### Authentication

- `POST /api/v1/users/register` - Register a new user.
- `POST /api/v1/users/login` - Login and retrieve a JWT.

### Movies

- `GET /api/v1/movies` - Get a list of all movies.
- `POST /api/v1/movies/new-movies` - Create a new movie.
- `GET /api/v1/movies/:movieID` - Get details of a specific movie.
- `DELETE /api/v1/movies/:movieID` - Delete a specific movie.
- `PUT /api/v1/movies/:movieID` - Update details of a specific movie.

### Genres

- `GET /api/v1/genres` - Get a list of all genres.
- `GET /api/v1/genres/:genreID` - Get details of a specific genre.
- `POST /api/v1/genres/new-genre` - Create a new genre.
- `DELETE /api/v1/genres/:genreID` - Delete a specific genre.

### Reservations

- `POST /api/v1/reservations/new-reservation` - Create a new reservation.
- `GET /api/v1/reservations/:reservationID` - Get reservation details.
- `GET /api/v1/reservations` - Get all reservations details.
- `DELETE /api/v1/reservations/:reservationID` - Cancel a reservation.

### Seats

- `GET /api/v1/seats` - Get a list of all seats.
- `GET /api/v1/seats/:seatID` - Get details of a specific seat
- `POST /api/v1/seats/new-seat` - Create a new seat.
- `DELETE /api/v1/seats/:seatID` - Delete a specific seat.
- `PUT /api/v1/seats/:seatID` - Update details of a specific seat
- `GET /api/v1/seats/available-seats` - Get available seats
- `GET /api/v1/seats/reserved-seats` - Get reserved seats

## Project Structure

```
TicketTrail/
├── src/
│   ├── authorization/
│   │   └── jwt.js
│   ├── api/
│   ├── config/
│   ├── db/
│   │   ├── migrations/
│   │   ├── models/
│   │   └── seeders/
│   ├── routes/
├── .env
├── package.json
├── README.md
└── server.js
```

## Development Notes

- Use `eslint` for linting to maintain code quality.
- Follow RESTful design principles for building API routes.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- Inspired by modern movie reservation systems.
- Built with love using open-source tools.
