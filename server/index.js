const express = require('express');
const path = require('path');
const http = require('http');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.post('/cadastrar', (req, res) => {
    let {email , senha} = req.body;
    console.log(email)
    console.log(senha)
    res.status(200).json({message: 'ok'});
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Servidor está escutando na porta 5000...');
});