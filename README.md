# SQLGen-AI

**SQLGen-AI** is an end-to-end AI-powered application that transforms natural language queries into executable SQL using advanced LLMs (CodeLlama via Groq API). It features a modern React frontend, a Node.js/Express backend, and a FastAPI-based AI inference service. The system visualizes your database schema and relationships, and allows you to generate, view, and run SQL queries with ease.

---

## Features

- **Natural Language to SQL**: Enter plain English queries and get valid SQL instantly.
- **AI-Powered**: Uses Meta's CodeLlama model via Groq API for accurate SQL generation.
- **Schema Visualization**: Interactive, auto-generated ER diagrams and schema explorer.
- **Live Query Execution**: Run generated SQL directly on your MySQL database and view results.
- **Modern UI**: Responsive, beautiful interface built with React, Tailwind CSS, and Lucide icons.
- **Secure & Configurable**: Environment-based configuration, secure credential handling, and robust error reporting.

---

## Architecture

```
+-----------+        +-------------------+        +-------------------+        +-------------------+
|  Frontend | <----> |   Node.js Backend | <----> |   FastAPI Service | <----> |   Groq/CodeLlama  |
|  (React)  |        |   (Express.js)    |        |   (Python)        |        |   (LLM Inference) |
+-----------+        +-------------------+        +-------------------+        +-------------------+
      |                        |                          |                          |
      |                        |                          |                          |
      |                        |                          |                          |
      |                        |                          |                          |
      |                        |                          |                          |
      |                        |                          |                          |
      |                        |                          |                          |
      |                        |                          |                          |
      v                        v                          v                          v
+-------------------+   +-------------------+   +-------------------+   +-------------------+
|   Schema & Query  |   |   SQL Execution   |   |   Prompt Builder  |   |   LLM Inference   |
+-------------------+   +-------------------+   +-------------------+   +-------------------+
```

---

## Monorepo Structure

```
ai-service/
  ├── main.py              # FastAPI app for AI inference
  ├── llama_infer.py       # LLM inference logic (Groq API)
  ├── schema_prompter.py   # SQL generation
  ├── requirements.txt     # Python dependencies
  └── .env                 # Groq API key

server/
  ├── index.js             # Express.js server
  ├── config/
  │   ├── mysql.js         # MySQL connection pool
  │   └── routes/
  │       ├── query.js     # /generate endpoint (NLQ to SQL to DB)
  │       ├── schema.js    # /schema endpoint (DB schema as JSON)
  │       └── getSchema.js # Schema extraction logic
  ├── package.json         # Node dependencies
  └── .env                 # MySQL credentials

client/
  ├── src/
  │   ├── App.jsx          # Main React app
  │   ├── components/      # QueryInput, QueryGenerator, SchemaDisplay, RelationshipDiagram
  │   ├── pages/           # Home, SystemArchitecture, etc.
  │   └── services/        # API service
  ├── public/              # Static assets
  ├── tailwind.config.js   # Tailwind CSS config
  ├── vite.config.js       # Vite config
  ├── package.json         # React dependencies
  └── .env                 # API URL
```

---

## Quickstart

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/sqlgen-ai.git
cd sqlgen-ai
```

### 2. Setup the Database

- Create a MySQL database and user.
- Update `server/.env` with your credentials.
- Import your schema (tables, relationships).

### 3. Start the Backend

```sh
cd server
npm install
npm run start
```

### 4. Start the AI Service

```sh
cd ../ai-service
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
# Add your Groq API key to .env
uvicorn main:app --reload --port 8000
```

### 5. Start the Frontend

```sh
cd ../client
npm install
npm run dev
```

- The frontend runs on [http://localhost:5173](http://localhost:5173)
- The backend runs on [http://localhost:5000](http://localhost:5000)
- The AI service runs on [http://localhost:8000](http://localhost:8000)

---

## Environment Variables

### `client/.env`
```
VITE_API_URL=http://localhost:5000
```

### `server/.env`
```
MYSQL_HOST=your-mysql-host
MYSQL_USER=your-mysql-user
MYSQL_PASSWORD=your-mysql-password
MYSQL_DATABASE=your-database
MYSQL_PORT=your-mysql-port
AI_SERVICE_URL=http://localhost:8000
```

### `ai-service/.env`
```
GROQ_API_KEY=your-groq-api-key
SCHEMA_API_URL=http://localhost:5000
```

---

## API Endpoints

### Backend (Express.js)

- `POST /generate`  
  Request: `{ "query": "Show all customers from NY" }`  
  Response: `{ "sql": "...", "results": [...] }`

- `GET /schema`  
  Returns the current database schema as JSON.

### AI Service (FastAPI)

- `POST /generate`  
  Request: `{ "query": "..." }`  
  Response: `{ "sql": "..." }`

- `GET /health`  
  Health check endpoint.

---

## Customization

- **Schema Extraction**: The backend auto-discovers tables, columns, and foreign keys.
- **Prompt Engineering**: Edit [`schema_prompter.py`](ai-service/schema_prompter.py) for custom prompt logic.
- **Frontend Styling**: Tweak Tailwind classes in React components for a custom look.

---

## Screenshots

> _Add screenshots of the UI, schema explorer, and relationship diagram here._

---

## License

MIT License

---

## Acknowledgements

- [Meta AI CodeLlama](https://ai.meta.com/research/models/codellama/)
- [Groq API](https://console.groq.com/)
- [React](https://react.dev/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Flow](https://reactflow.dev/)
