# Maya Bazzar

A simple shopping cart app: browse products, add them to a cart, change quantities, and see every line total and the overall cart total update instantly.

| Layer    | Tech                              |
|----------|-----------------------------------|
| Frontend | React 18 (Vite)                   |
| Backend  | Java 17+, Spring Boot 3.3 REST API |
| Database | MySQL 8                           |

```
maya-bazzar/
├── backend/             Spring Boot app (Maven)
├── frontend/            React app (Vite)
├── docker-compose.yml   Optional: starts MySQL for you
└── README.md
```

## What you need installed

- JDK 17 or newer
- Maven 3.9+ (or open `backend/` in IntelliJ / VS Code, which can run it for you)
- Node.js 18 or newer
- MySQL 8 **or** Docker (to run MySQL from the included compose file)

## 1. Start MySQL

**Option A: Docker (easiest)**

```bash
docker compose up -d
```

This starts MySQL on port 3306 with user `root` / password `root`, which matches the backend's defaults.

**Option B: your own MySQL**

Make sure it is running on port 3306. The backend creates the `shopdb` database and all tables automatically. If your username or password is not `root` / `root`, set environment variables before starting the backend:

```bash
# Linux / macOS
export DB_USERNAME=myuser
export DB_PASSWORD=mypassword

# Windows (PowerShell)
$env:DB_USERNAME="myuser"
$env:DB_PASSWORD="mypassword"
```

(You can also edit `backend/src/main/resources/application.properties` directly.)

## 2. Start the backend (port 8080)

```bash
cd backend
mvn spring-boot:run
```

On first start it creates the tables and adds 6 sample products. Check it at http://localhost:8080/api/products

## 3. Start the frontend (port 5173)

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

The dev server forwards `/api` calls to the backend, so no extra setup is needed.

## Features

1. Add products with a name and price; all available products are listed.
2. Add any product to the cart (adding it again increases its quantity).
3. Increase or decrease quantities with + / − (minimum 1), or remove an item.
4. Each cart line shows price × quantity = line total.
5. The overall cart total updates on every change.

Cart contents are stored in MySQL, so they survive a page refresh and a backend restart.

## REST API

| Method | URL                       | Body                              | Purpose                    |
|--------|---------------------------|-----------------------------------|----------------------------|
| GET    | `/api/products`           |                                   | List products              |
| POST   | `/api/products`           | `{"name": "Pen", "price": 25.50}` | Add a product              |
| GET    | `/api/cart`               |                                   | Get cart with totals       |
| POST   | `/api/cart/items`         | `{"productId": 1, "quantity": 1}` | Add product to cart        |
| PUT    | `/api/cart/items/{id}`    | `{"quantity": 3}`                 | Set an item's quantity     |
| DELETE | `/api/cart/items/{id}`    |                                   | Remove an item             |
| DELETE | `/api/cart`               |                                   | Empty the cart             |

Every cart call returns the whole recalculated cart:

```json
{
  "items": [
    { "id": 1, "productId": 1, "name": "Wireless Mouse", "price": 599.00, "quantity": 2, "lineTotal": 1198.00 }
  ],
  "totalItems": 2,
  "cartTotal": 1198.00
}
```

Totals are calculated on the server with `BigDecimal`, so there are no floating point rounding errors.

## Troubleshooting

- **"Cannot reach the Maya Bazzar server"** in the browser: the backend is not running on port 8080.
- **`Access denied for user 'root'`** when the backend starts: your MySQL password is not `root`. Set `DB_PASSWORD` (see above).
- **`Communications link failure`**: MySQL is not running or not on port 3306.
- **Port already in use**: change `server.port` in `application.properties` (and the proxy target in `frontend/vite.config.js`).
