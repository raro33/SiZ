// db.js

const mongoose = require('mongoose');

// Define o esquema do usuário (o que será salvo no banco)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Salva o hash da senha
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Função de conexão com o MongoDB
async function connectDb() {
    if (mongoose.connections[0].readyState) {
        // Já está conectado
        return true;
    }
    
    try {
        // Usa a variável de ambiente MONGO_URI, que você configurará no Vercel
        await mongoose.connect(process.env.MONGO_URI);
        // console.log('MongoDB Conectado.'); // Remova ou comente após testar
        return true;
    } catch (error) {
        console.error('Erro na conexão com o MongoDB:', error.message);
        return false;
    }
}

module.exports = { connectDb, User };