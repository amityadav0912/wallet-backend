🧮 Expense Tracker – Backend (Node.js + Express)

This is the backend API for the Expense Tracker application.
It provides RESTful endpoints for managing user transactions and summaries, with authentication and rate-limiting support.

⚙️ Tech Stack
Tool / Library	Purpose
Express.js	Web server framework
Neon PostgreSQL (Serverless)	Cloud-hosted PostgreSQL database
@upstash/redis	Fast in-memory storage and caching
@upstash/ratelimit	Request rate limiting
dotenv	Manage environment variables
cors	Handle cross-origin requests from frontend
cron	Schedule periodic background tasks
nodemon (dev)	Auto-restart server during development

🧠 Key Features
RESTful CRUD APIs for transactions
Per-user summaries (balance, income, expenses)
Rate limiting to protect from abuse
Secure CORS configuration for frontend requests
Environment-based configuration (dev & prod)
Deployed easily to services like Render or Railway

📁 Project Structure
backend/
 ├── src/
 │   ├── server.js           # Main entry point
 │   ├── routes/             # Express routes
 │   ├── controllers/        # Business logic
 │   ├── db/                 # Database connection (Neon)
 │   ├── middleware/         # Rate limiting & validation
 │   └── utils/              # Helper functions
 ├── .env.example
 ├── package.json
 └── README.md

⚙️ Setup Instructions
1️⃣ Install Dependencies
cd backend
npm install

2️⃣ Configure Environment Variables
Create a .env file in the backend root:
PORT=5001
DATABASE_URL=postgres://user:password@host/dbname
REDIS_URL=https://your-upstash-url

3️⃣ Run in Development
npm run dev

4️⃣ Run in Production
npm start

Server will start at:
http://localhost:5001

🧭 API Endpoints
Method	Endpoint	Description
POST	/api/transactions	Create a new transaction
GET	/api/transactions/:userId	Get all transactions for a user
GET	/api/transactions/summary/:userId	Get user’s income, expenses, and balance
DELETE	/api/transactions/:id	Delete a transaction

🛠️ Middleware
CORS: Allows secure requests from Expo frontend
Rate Limit: Prevents too many rapid API calls (via Upstash Redis)
Error Handling: Graceful JSON-based error responses

📦 Deployment
Deployed on Render (Node backend) with:
Serverless Neon PostgreSQL
Upstash Redis for rate-limiting
Environment variables managed securely via dashboard

👨‍💻 Author
Amit Yadav
Backend API for the Expense Tracker App.
Focus: REST API design, serverless database integration, and rate limiting.