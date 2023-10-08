# Coverly Backend

This is the backend repository for the Coverly ecommerce platform, which serves as the server-side component of the application. Coverly allows users to shop for mobile phone back covers for their smartphones. The backend is built using Express.js, Node.js, and MongoDB.


## Getting Started

To get the backend up and running locally, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up the required environment variables (see [Environment Variables](#environment-variables)).
4. Start the server using `npm run server`.

## Project Structure

The backend project follows a typical structure:

- `controllers`: Contains controller functions that handle route logic.
- `models`: Defines the MongoDB data models.
- `routes`: Defines API routes and their associated controllers.
- `middlewares`: Custom middleware functions.
- `index.js`: Entry point of the application.

## Technologies Used

The backend of Coverly is built using the following technologies:

- Node.js: JavaScript runtime environment.
- Express.js: Web application framework for Node.js.
- MongoDB: NoSQL database for data storage.
- Mongoose: MongoDB object modeling for Node.js.

## API Endpoints

For detailed documentation of the API endpoints and how to use them, refer to the [API documentation](https://coverly-api-docs.vercel.app/).

## Environment Variables

The following environment variables are used in this project:

- `PORT`: The port on which the server runs.
- `MONGODB_URI`: The URI for connecting to the MongoDB database.
- `ACCESS_TOKEN_SECRET`
- `RAZORPAY_API_KEY`: generated from razorpay
- `RAZORPAY_API_SECRET`: generated form razorpay

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Create a pull request explaining your changes and why they should be merged.

Feel free to reach out if you have any questions or need further assistance. Happy coding!



