# Product Catalog API

A backend API built with Node.js, Express.js, and PostgreSQL to manage and retrieve product data efficiently at scale.

The project contains a dataset of 200,000 products and supports category filtering, cursor-based pagination, and optimized database queries using indexes.

## Features

* Stores 200,000 product records in PostgreSQL
* Category-based filtering
* Cursor-based pagination using product IDs
* Optimized queries with database indexes
* Cloud PostgreSQL database hosted on Neon
* Backend deployed on Railway

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Neon Database
* Railway

## Database Schema

Each product contains:

| Field      | Type               |
| ---------- | ------------------ |
| id         | SERIAL PRIMARY KEY |
| name       | TEXT               |
| category   | TEXT               |
| price      | FLOAT              |
| created_at | TIMESTAMP          |
| updated_at | TIMESTAMP          |

## API Endpoints

### Get Latest Products

```http
GET /
```

Returns the latest 20 products.

### Filter Products by Category

```http
GET /?category=Books
```

Returns the latest 20 products from the specified category.

### Cursor Pagination

```http
GET /?cursor=199980
```

Returns the next 20 products with IDs lower than the supplied cursor.

### Category + Cursor Pagination

```http
GET /?category=Books&cursor=199980
```

Returns paginated results for a specific category.

## Pagination Strategy

Cursor-based pagination was implemented using the product ID instead of OFFSET-based pagination.

Example:

```http
GET /?cursor=199980
```

This returns products with:

```sql
WHERE id < 199980
ORDER BY id DESC
LIMIT 20
```

This approach scales significantly better than OFFSET pagination for large datasets.

## Database Optimization

Indexes were added to improve query performance for:

* Product ID lookups
* Category filtering
* Pagination queries

## Data Seeding

A custom seed script generates 200,000 products with:

* Random categories
* Random prices
* Random timestamps
* Unique product names

Batch insertion is used to improve insertion performance.

## Installation

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_neon_connection_string
```

Run the server:

```bash
node server.js
```

Run the seed script:

```bash
node seed.js
```

## Deployment

* Database: Neon PostgreSQL
* Backend Hosting: Railway

## Live API

Replace with your deployed Railway URL:

```text
https://your-railway-url.up.railway.app
```
