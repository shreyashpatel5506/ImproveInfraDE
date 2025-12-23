# ImproveInfraDE - Backend

ImproveInfraDE is a Node.js-based backend system designed to manage infrastructure improvement reports. It allows users to report issues (posts) and provides administrative capabilities for officers to manage these reports by setting priorities and updating statuses.

## Features

* **Infrastructure Reporting (Posts):** Create, view, like, and comment on infrastructure issues.
* **Officer Authentication:** Secure signup and login for officers using JWT and bcryptjs.
* **Post Management:** Officers can update the status (Pending, In Progress, Resolved) and priority (Low to Critical) of reports.
* **Image Handling:** Integration with Cloudinary for secure image uploads and storage.
* **Database:** MongoDB integration via Mongoose for data persistence.

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express
* **Database:** MongoDB with Mongoose
* **Authentication:** JSON Web Tokens (JWT) & bcryptjs
* **File Uploads:** Multer & Cloudinary
* **Environment Variables:** dotenv

## API Endpoints

### Auth Routes (`/v1/auth`)
* `POST /officerSignup`: Register a new officer account.
* `POST /officerLogin`: Authenticate an officer and receive a JWT.

### Post Routes (`/v1/post`)
* `GET /`: Retrieve all reported issues.
* `GET /:id`: Get details of a single post.
* `POST /create`: Create a new infrastructure report (requires image and location).
* `POST /comment/:id`: Add a comment to a report.
* `PATCH /like/:id`: Increment the like count for a post.
* `PATCH /:id/priority`: Update report priority (Officer only).
* `PATCH /status/:id`: Update report status (Officer only).
* `DELETE /delete/:id`: Remove a report and its associated image from Cloudinary (Officer only).

## Environment Setup

To run this project, create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
cloud_name=your_cloudinary_name
api_key=your_cloudinary_api_key
api_secret=your_cloudinary_api_secret

Installation and Running
Install Dependencies:

Bash

npm install
Start Development Server:

Bash

npm run dev
Start Production Server:

Bash

npm start
The server will listen on http://localhost:8080.

Project Structure
src/index.js: Main entry point and server configuration.

routes/: Route definitions for authentication and posts.

controller/: Business logic for handling requests.

models/: Mongoose schemas for Posts and Officers.

middlewear/: Token verification and image upload handling.

db.js: MongoDB connection logic.

License
This project is licensed under the Apache License 2.0.

Contributions