import { configDotenv } from 'dotenv';
import express from 'express';
import cors from 'cors';
import queryRoutes from './config/routes/query.js';
import schemaRoutes from './config/routes/schema.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import Redis from 'ioredis';



const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SQLGen-AI Express API',
      version: '1.0.0',
      description: 'API documentation for SQLGen-AI backend',
    },
  },
  apis: ['./config/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);


configDotenv();

const app = express();
const redis=new Redis(process.env.REDIS_URL);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({
  origin: 'http://localhost:5173 || https://sqlgen-ai.vercel.app/',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'], 
  credentials: true 
}));

// Parse JSON bodies
app.use(express.json());

// Define routes
app.use('/generate', queryRoutes);
app.use('/schema', schemaRoutes);

// Fallback for unmatched routes
app.use((req, res) => {
  res.status(404).json({ detail: 'Not Found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

export {redis};