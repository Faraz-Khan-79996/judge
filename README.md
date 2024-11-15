# Online Judge Platform

An online coding platform, similar to Codeforces, built using the MERN stack. This project allows users to solve coding problems, submit their code, and view the results in real-time. The platform supports multiple programming languages and includes features for comparing output and handling code execution securely within isolated environments.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **User Authentication**: Sign up, log in, and manage profiles.
- **Problem Solving**: Users can browse problems, view problem descriptions, and submit solutions.
- **Code Execution**: Supports multiple programming languages. Code execution is sandboxed and isolated using Docker.
- **Result Feedback**: Displays detailed feedback, including correct or incorrect outputs, with differences highlighted.
- **Leaderboards**: Displays rankings based on problem-solving performance.
- **Admin Dashboard**: Allows administrators to add, update, or remove problems and view platform statistics.

## Tech Stack

- **Frontend**: React, Tailwind CSS, react-tooltip, react-chartjs-2
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Other Libraries**: Bull for job queue, Redis for caching, Docker for containerized code execution
- **Deployment**: Dockerized app deployable on Render

## Installation

1. **Clone the repository**: `git clone https://github.com/username/online-judge-platform.git` and `cd online-judge-platform`
2. **Install dependencies**: - For the frontend: `cd client` and `npm install` - For the backend: `cd server` and `npm install`

## Environment Variables

Create a `.env` file in the `server` directory and add the following variables:

```env
CONNECTION_STRING=your-mongodb-connection-string
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

## Running the Project using Docker

1. **Pull the Docker image**:
   ```bash
   docker pull farazkhan24503/judge:latest
    ```
2. **Run the Docker container with the required environment variables and port mapping**:
   ```
       docker run -d -p 3000:3000 \
      -e CONNECTION_STRING=your-mongodb-connection-string \
      -e CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name \
      -e CLOUDINARY_API_KEY=your-cloudinary-api-key \
      -e CLOUDINARY_API_SECRET=your-cloudinary-api-secret \
      farazkhan24503/judge:latest
    ```
    Replace your-mongodb-connection-string, your-cloudinary-cloud-name, your-cloudinary-api-key, and your-cloudinary-api-secret with your actual environment variable values.

3. **Access the application: Open your browser and go to http://localhost:3000 to access the online judge platform.**:

## Screenshots and Videos
- **Demo Video**:  https://youtu.be/aKCjscl01VI?si=MVuf9G-qrsTMNZdG
![Screenshot from 2024-11-15 18-54-26](https://github.com/user-attachments/assets/71fa4edb-a49d-44ea-8eb6-339d9e754182)
![Screenshot from 2024-11-15 19-27-16](https://github.com/user-attachments/assets/02ee77ac-294b-45f8-b85c-cda893a9ff8e)
![Screenshot from 2024-11-15 18-55-26](https://github.com/user-attachments/assets/2103472d-d8a5-4e43-ac88-bac51116b6b7)
![Screenshot from 2024-11-15 18-54-47](https://github.com/user-attachments/assets/1b9e8a27-2d58-4542-ae2a-ad87f32afcbb)


## Future Improvements

- **Code Editor**: Integrating a real-time code editor to allow users to write and submit code without leaving the platform.
- **Language Support**: Expanding support for more programming languages for submissions.
- **Test Case Management**: Enhancing the management of test cases for different problems, with more complex input-output handling.
- **Leaderboard**: Adding a global leaderboard to track users' performance across various problems.

## Contributing

We welcome contributions! If you’d like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request to merge your changes

Please ensure your code follows the existing coding style, and add tests for new functionality.
