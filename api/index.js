// api/index.js - Rotas do Servidor

const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { connectDb, User } = require('../db'); 

const app = express();

// O Vercel precisa que a origem seja configurada. '*' permite qualquer site,
// mas para maior segurança, substitua por seu domínio GitHub Pages exato
app.use(cors({
    origin: '*', 
    methods: ['POST', 'OPTIONS'], // Permite apenas POST e OPTIONS (preflight)
}));

// Processa dados JSON e de formulário
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de Cadastro
app.post('/api/cadastro', async (req, res) => {
    await connectDb();
    
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send('Este e-mail já está cadastrado.');
        }

        // Criptografa a senha de forma segura
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword 
        });
        await newUser.save();

        // IMPORTANTE: O Front-end (HTML) receberá esta resposta e deve 
        // redirecionar para login.html
        res.status(201).send({ message: 'Cadastro realizado com sucesso! Você já pode fazer login.' });
    
    } catch (error) {
        res.status(500).send('Erro interno do servidor.');
    }
});

// Rota de Login
app.post('/api/login', async (req, res) => {
    await connectDb(); 

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Credenciais inválidas.');
        }

        // Compara a senha digitada com a criptografada no banco
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send('Credenciais inválidas.');
        }

        // Login bem-sucedido: Em um projeto real, aqui você criaria uma Sessão ou Token JWT.
        res.status(200).send({ message: 'Login realizado com sucesso! Redirecionando para o Início.' });

    } catch (error) {
        res.status(500).send('Erro interno do servidor.');
    }
});

// Rota de Teste (para verificar se a API está no ar)
app.get('/api', (req, res) => {
    res.status(200).send('API do SiZ está funcionando!');
});

// A Rota Padrão (necessário para o Vercel Serverless)
module.exports = app;