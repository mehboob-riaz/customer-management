# Customer Management Project

This project consists of a Laravel backend for managing customer data and a Vue.js frontend for interacting with the backend. Follow the instructions below to set up and run the project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

-   PHP (version 8.0 or higher)
-   Composer
-   Node.js (version 16.x or higher)
-   npm (comes with Node.js)

## Setting Up the Backend (Laravel)

### Clone the Repository in htdocs

```bash
git clone https://github.com/mehboob-riaz/customer-management.git
cd customer-management
git checkout develop
```

### Install PHP Dependencies

```bash
composer install
```

### Set Up the Environment

```bash
cp .env.example .env

```

### Generate Application Key

```bash
php artisan key:generate
```

### Run Migrations

```bash
php artisan migrate
```

### Run Seeders

```bash
php artisan db:seed --class=CustomerSeeder
```

### Start the Laravel Development Server

```bash
php artisan serve
```

### Setting Up the Frontend (Vue.js)

Navigate to the Frontend Directory (by open new terminal)

```bash
cd customer-frontend
npm install
```

### Run the Development Server

```bash
npm run dev
```

## Development

-   **Backend**:

    -   Laravel routes are located in the `routes/` directory.
    -   Controllers are located in the `app/Http/Controllers/` directory.

-   **Frontend**:
    -   Vue components and views are located in the `src/` directory of the `customer-frontend` project.

## Troubleshooting

-   **Port Conflicts**:

    -   Ensure the ports used by Laravel and Vue are not blocked by other applications.

-   **Database Issues**:
    -   Verify database settings in the `.env` file.
    -   Ensure the database server is running.
