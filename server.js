// server.js

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Carregar variáveis de ambiente
dotenv.config();

// Configurar diretórios (porque estamos usando módulos ES6)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar o app
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
import indexRoutes from './routes/index.js';
app.use('/', indexRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
