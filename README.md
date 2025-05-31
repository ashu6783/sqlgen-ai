# SQLGen-AI 🚀

<div align="center">

![SQLGen-AI Logo](https://img.shields.io/badge/SQLGen-AI-blue?style=for-the-badge&logo=database&logoColor=white)

**Transform Natural Language into SQL with AI Power**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)](https://github.com/yourusername/sqlgen-ai)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

</div>

---

## 🎯 Overview

**SQLGen-AI** is an end-to-end AI-powered application that transforms natural language queries into executable SQL using advanced LLMs (**meta-llama/llama-4-maverick-17b-128e-instruct** via Groq API). It features a modern React frontend, a Node.js/Express backend, and a FastAPI-based AI inference service. The system visualizes your database schema and relationships, and allows you to generate, view, and run SQL queries with ease.

## ✨ Key Features

<div align="center">

| 🤖 **AI-Powered** | 📊 **Schema Visualization** | ⚡ **Live Execution** | 🎨 **Modern UI** |
|:---:|:---:|:---:|:---:|
| Natural language to SQL conversion | Interactive ER diagrams | Run queries directly | React + Tailwind CSS |

</div>

- **🔤 Natural Language to SQL**: Enter plain English queries and get valid SQL instantly
- **🧠 AI-Powered**: Uses Meta's meta-llama/llama-4-maverick-17b-128e-instruct model via Groq API
- **📈 Schema Visualization**: Interactive, auto-generated ER diagrams and schema explorer
- **🏃‍♂️ Live Query Execution**: Run generated SQL directly on your MySQL database
- **🎨 Modern UI**: Responsive, beautiful interface with React, Tailwind CSS, and Lucide icons
- **🔒 Secure & Configurable**: Environment-based configuration and robust error handling
- **📚 Swagger API Docs**: Interactive API documentation for all endpoints
- **🐳 Docker Support**: Containerized deployment ready

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

### AI Service
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-F55036?style=for-the-badge&logo=groq&logoColor=white)

### DevOps & Tools
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

</div>

---

## 🏗️ Architecture

<div align="center">

```mermaid
graph TD
    A[🖥️ React Frontend<br/>Port 5173] --> B[🔗 Express.js Backend<br/>Port 5000]
    B --> C[🤖 FastAPI AI Service<br/>Port 8000]
    C --> D[🧠 Groq/Meta-Llama<br/>LLM Inference]
    B --> E[🗄️ MySQL Database]
    B --> F[📦 Redis Cache]
    
    style A fill:#61DAFB,stroke:#333,stroke-width:2px,color:#000
    style B fill:#68A063,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#009688,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#FF6B6B,stroke:#333,stroke-width:2px,color:#fff
    style E fill:#4479A1,stroke:#333,stroke-width:2px,color:#fff
    style F fill:#DC382D,stroke:#333,stroke-width:2px,color:#fff
```

</div>

---

## 📁 Project Structure

```
📦 sqlgen-ai/
├── 🤖 ai-service/
│   ├── main.py              # FastAPI app for AI inference
│   ├── llama_infer.py       # LLM inference logic (Groq API)
│   ├── schema_prompter.py   # SQL generation
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Groq API key
├── 🖥️ server/
│   ├── index.js             # Express.js server
│   ├── config/
│   │   ├── mysql.js         # MySQL connection pool
│   │   └── routes/
│   │       ├── query.js     # /generate endpoint
│   │       ├── schema.js    # /schema endpoint
│   │       └── getSchema.js # Schema extraction logic
│   ├── package.json         # Node dependencies
│   ├── 🐳 Dockerfile        # Docker build for backend
│   ├── 🐳 compose.yaml      # Docker Compose
│   └── .env                 # MySQL/Redis credentials
└── 🎨 client/
    ├── src/
    │   ├── App.jsx          # Main React app
    │   ├── components/      # UI Components
    │   ├── pages/           # App pages
    │   └── services/        # API service
    ├── public/              # Static assets
    ├── tailwind.config.js   # Tailwind CSS config
    ├── vite.config.js       # Vite config
    └── .env                 # API URL
```

---

## 🚀 Quick Start

### Prerequisites

![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=flat-square&logo=node.js)
![Python](https://img.shields.io/badge/Python-v3.8+-blue?style=flat-square&logo=python)
![MySQL](https://img.shields.io/badge/MySQL-v8.0+-orange?style=flat-square&logo=mysql)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/sqlgen-ai.git
cd sqlgen-ai
```

### 2️⃣ Database Setup

Create a MySQL database and configure your credentials:

```sql
CREATE DATABASE sqlgen_db;
CREATE USER 'sqlgen_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON sqlgen_db.* TO 'sqlgen_user'@'localhost';
```

### 3️⃣ Backend Setup

```bash
cd server
npm install
# Configure your .env file
npm run start
```

### 4️⃣ AI Service Setup

```bash
cd ../ai-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
# Add your Groq API key to .env
uvicorn main:app --reload --port 8000
```

### 5️⃣ Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

<div align="center">

🎉 **Your application is now running!**

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | [http://localhost:5173](http://localhost:5173) | React UI |
| Backend | [http://localhost:5000](http://localhost:5000) | Express API |
| AI Service | [http://localhost:8000](http://localhost:8000) | FastAPI AI |
| Swagger Docs | [http://localhost:5000/api-docs](http://localhost:5000/api-docs) | API Documentation |

</div>

---

## ⚙️ Environment Configuration

<details>
<summary>📁 <strong>client/.env</strong></summary>

```env
VITE_API_URL=http://localhost:5000
```
</details>

<details>
<summary>📁 <strong>server/.env</strong></summary>

```env
MYSQL_HOST=localhost
MYSQL_USER=sqlgen_user
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=sqlgen_db
MYSQL_PORT=3306
AI_SERVICE_URL=http://localhost:8000
REDIS_URL=redis://default:password@localhost:6379
```
</details>

<details>
<summary>📁 <strong>ai-service/.env</strong></summary>

```env
GROQ_API_KEY=your_groq_api_key_here
SCHEMA_API_URL=http://localhost:5000
```
</details>

---

## 🐳 Docker Deployment

### Quick Docker Setup

```bash
# Build and run backend with Docker Compose
cd server
docker compose up --build

# For production (multi-platform build)
docker build --platform=linux/amd64 -t sqlgen-backend .
```

### Docker Architecture

<div align="center">

```mermaid
graph TB
    subgraph "🐳 Docker Environment"
        A[📦 Backend Container<br/>Node.js + Express]
        B[📦 AI Service Container<br/>Python + FastAPI]
        C[📦 MySQL Container<br/>Database]
        D[📦 Redis Container<br/>Cache]
    end
    
    E[🌐 Client<br/>React App] --> A
    A --> B
    A --> C
    A --> D
    
    style A fill:#68A063,stroke:#333,stroke-width:2px,color:#fff
    style B fill:#009688,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#4479A1,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#DC382D,stroke:#333,stroke-width:2px,color:#fff
    style E fill:#61DAFB,stroke:#333,stroke-width:2px,color:#000
```

</div>

---

## 📚 API Documentation

### Backend Endpoints (Express.js)

<div align="center">

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| `POST` | `/generate` | Generate SQL from natural language | `{"query": "Show all users"}` | `{"sql": "...", "results": [...]}` |
| `GET` | `/schema` | Get database schema | - | `{"tables": [...], "relationships": [...]}` |
| `GET` | `/health` | Health check | - | `{"status": "ok"}` |

</div>

### AI Service Endpoints (FastAPI)

<div align="center">

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/generate` | Generate SQL using AI |
| `GET` | `/health` | Service health check |
| `GET` | `/docs` | Interactive API docs |

</div>

**📖 Interactive Documentation**: Visit [http://localhost:5000/api-docs](http://localhost:5000/api-docs) for Swagger UI

---

## 🖼️ Screenshots

<div align="center">

| 🏠 **Dashboard** | 📊 **Schema Visualization** |
|:---:|:---:|
| ![Dashboard](https://via.placeholder.com/400x250/61DAFB/000000?text=Dashboard+Screenshot) | ![Schema](https://via.placeholder.com/400x250/68A063/FFFFFF?text=Schema+Visualization) |

| 🤖 **AI Query Generation** | 📈 **Query Results** |
|:---:|:---:|
| ![AI Query](https://via.placeholder.com/400x250/009688/FFFFFF?text=AI+Query+Generation) | ![Results](https://via.placeholder.com/400x250/4479A1/FFFFFF?text=Query+Results) |

</div>

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 **Fork** the repository
2. 🔧 **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. 📤 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🔄 **Open** a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📝 License

<div align="center">

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

</div>

---

## 🙏 Acknowledgements

<div align="center">

Special thanks to the amazing open-source community and these fantastic projects:

[![Meta AI](https://img.shields.io/badge/Meta_AI-CodeLlama-blue?style=for-the-badge&logo=meta)](https://ai.meta.com/research/models/codellama/)
[![Groq](https://img.shields.io/badge/Groq-API-orange?style=for-the-badge)](https://console.groq.com/)
[![React](https://img.shields.io/badge/React-Framework-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Framework-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/sqlgen-ai?style=social)](https://github.com/yourusername/sqlgen-ai/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/sqlgen-ai?style=social)](https://github.com/yourusername/sqlgen-ai/network/members)

**Made with ❤️ by [YourName](https://github.com/yourusername)**

</div>
