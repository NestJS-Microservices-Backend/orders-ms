# Orders Microservice

A robust and scalable microservice for managing orders, built with NestJS.

## Description

This microservice is part of a larger backend system. Its primary responsibility is to handle all order-related operations, including creation, retrieval of one or all orders, and status changes. It communicates with other microservices via TCP and is designed to be run in a containerized environment using Docker.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
  - [Development](#development)
  - [Docker](#docker)
- [Available Operations (Message Patterns)](#available-operations-message-patterns)
- [Running Tests](#running-tests)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/get-started) (for containerized deployment)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd orders-ms
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

## Configuration

The application requires environment variables to run.

1.  Create a `.env` file by copying the template:
    ```bash
    cp .template.env .env
    ```
2.  Update the `.env` file with your specific configuration.

| Variable       | Description                  | Default in `docker-compose` |
| -------------- | ---------------------------- | --------------------------- |
| `PORT`         | Port for the microservice    | `3002`                      |
| `DATABASE_URL` | The connection string for the PostgreSQL database. See `docker-compose.yml` for database credentials. | `postgresql://postgres:123456@orders-db:5432/ordersdb?schema=public` |


## Running the Application

### Development

To run the application in development mode with hot-reloading:

```bash
npm run start:dev
```

### Docker

The application is configured to run with a PostgreSQL database using Docker Compose.

1.  Ensure Docker is running.
2.  Run the following command from the root of the project:
    ```bash
    docker-compose up -d
    ```
This will start the `orders-ms` application and the `orders-db` PostgreSQL database.

## Available Operations (Message Patterns)

This microservice listens for the following TCP message patterns:

-   `createOrder`: Creates a new order.
    -   **Payload:** `CreateOrderDto`
-   `findAllOrders`: Retrieves all orders.
-   `findOneOrder`: Retrieves a single order by its ID.
    -   **Payload:** `{ id: number }`
-   `changeOrderStatus`: Changes the status of an order. (Currently not implemented)

## Running Tests

Execute the following commands to run the test suites:

```bash
# Unit tests
$ npm run test

# End-to-end tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```
