# RentAScooter Microservice

This repository contains the implementation of RentAScooter, a microservice for managing scooter rentals.

## Overview

### Technologies Used

1. **Node.js**: A JavaScript runtime used for building the backend services due to its non-blocking, event-driven architecture.
2. **Express.js**: A lightweight web application framework for Node.js, used for building RESTful APIs with ease.
3. **MongoDB**: A NoSQL database used for storing scooter, user, and rental information. MongoDB's flexibility and scalability make it suitable for microservices architectures.
4. **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js, used for modeling application data and interacting with MongoDB databases.
5. **RabbitMQ**: A message broker used for asynchronous communication between microservices. RabbitMQ facilitates decoupling and scalability in distributed systems.
6. **Swagger**: An open-source software framework used for designing, building, and documenting RESTful APIs. Swagger provides a standard way to describe API endpoints and their functionalities.
7. **Postman**: A collaboration platform for API development used for testing API endpoints and monitoring their performance.
8. **Docker**: A containerization platform used for packaging and deploying microservices and their dependencies in isolated environments.
9. **docker-compose**: A tool for defining and running multi-container Docker applications, used for orchestrating the deployment of RentAScooter microservices.

## Getting Started

To get started with RentAScooter, follow these steps:

1. Clone the repository.
2. Set up the required environment variables and configurations.
3. Run `docker-compose up` to deploy the microservice.
4. Access the Swagger interface and start exploring the features.
5. Use the Swagger documentation to understand and interact with the API endpoints.
