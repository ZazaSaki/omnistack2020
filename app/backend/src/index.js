//protocolo de comunicação
const express = require('express');
//protocolo de conecção
const mongoose = require('mongoose');
//importação de rotas
const routes = require('./routes');

//inicialização do sistema
const app = express();

//conecção ao servidor
mongoose.connect('mongodb+srv://omnistack:omnistack@app-csips.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  useCreateIndex: true,
});

//configurar utilização de json (sempre antes de configurar as rotas)
app.use(express.json());
//configurar a utilição do formato json para todas as rotas
app.use(routes);
app.listen(3333);   


