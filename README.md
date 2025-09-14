# Orders Microservice

A robust and scalable microservice for managing orders, built with NestJS, Prisma, and PostgreSQL.

## Description

This microservice is part of a larger backend system. Its primary responsibility is to handle all order-related operations, including creation, retrieval, and status changes. It uses Prisma as its ORM for database interactions with PostgreSQL and is designed to be run in a containerized environment using Docker.

## Table of Contents

- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
  - [1. Start the Database](#1-start-the-database)
  - [2. Run Database Migrations](#2-run-database-migrations)
  - [3. Run the Application](#3-run-the-application)
- [Available Operations (Message Patterns)](#available-operations-message-patterns)
- [Database Model](#database-model)
- [Running Tests](#running-tests)

## Technologies

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/get-started)

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
2.  Update the `.env` file with your specific configuration. The primary variable is the `DATABASE_URL`.

| Variable       | Description                                           | Default in `docker-compose`                                         |
| -------------- | ----------------------------------------------------- | ------------------------------------------------------------------- |
| `DATABASE_URL` | The connection string for the PostgreSQL database.    | `postgresql://postgres:123456@localhost:5432/ordersdb?schema=public` |
| `PORT`         | Port for the microservice (if run outside Docker)     | `3002`                                                              |

*Note: When running with `docker-compose`, the database host should be `orders-db`, but for local development connecting to the Dockerized DB, you'll use `localhost`.*

## Running the Application

Follow these steps in order to get the application running.

### 1. Start the Database

Ensure Docker is running. Then, start the PostgreSQL database using Docker Compose:
```bash
docker-compose up -d
```
This will start the `orders-db` service.

### 2. Run Database Migrations

Once the database is running, apply the database schema using Prisma Migrate:
```bash
npx prisma migrate dev
```
This command will create the `Order` table and apply the defined schema from `prisma/schema.prisma`.

### 3. Run the Application

To run the application in development mode with hot-reloading:

```bash
npm run start:dev
```
The microservice will be running and listening for messages.

## Available Operations (Message Patterns)

This microservice listens for the following TCP message patterns:

-   `createOrder`: Creates a new order.
    -   **Payload:** `CreateOrderDto`
-   `findAllOrders`: Retrieves all orders.
-   `findOneOrder`: Retrieves a single order by its ID.
    -   **Payload:** `{ id: string }`
-   `changeOrderStatus`: Changes the status of an order.
    -   **Payload:** `UpdateOrderDto` (contains `id` and `status`)

## Database Model

The `Order` model is defined in `prisma/schema.prisma` as follows:

```prisma
enum OrderStatus {
  PENDING
  DELIVERED
  CANCELLED
}

model Order {
  id          String @id @default(uuid())
  totalAmount Float
  totalItems  Int

  status OrderStatus
  paid   Boolean     @default(false)
  paidAt DateTime?

  createdAt DateTime @default(now())
  updateAt  DateTime @updatedAt
}
```

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