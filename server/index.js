const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const session = require('express-session');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'mysecret',
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    resave: false
}));

const controlUsuario = require('./controller/control-user');
const controlAnimais = require('./controller/control-animais');

//controlAnimais.populateBD();

const checkAuth = (req, res, next) => {
    if (req.session.authenticated == false)
        return res.status(401).json({message: 'Usuário não está logado.'});
    next();
}

const isUserAuth = (req, res, next) => {
    if (req.session.authenticated == true) 
        return res.status(200).json({auth: req.session.authenticated});
    else
        return res.status(401).json({message: 'Usuário não está logado.'});
}

const isUserAdmin = (req, res, next) => {
    console.log('index-isuseradmin')
    console.log(req.session);
    if (req.session.admin == true)
        return res.status(200).json({admin: req.session.admin});
    else   
        return res.status(401).json({message: 'Usuário não é admin'});
}

// rotas do usuário
app.post('/cadastrar', controlUsuario.cadastrar);
app.post('/login', controlUsuario.login);
app.get('/logout', (req, res) => {
    req.session.destroy();
})

app.get('/auth', isUserAuth);
app.get('/admin', isUserAdmin);

// rotas do animais
app.post('/addAnimal', checkAuth, controlAnimais.addAnimal);
app.post('/getAnimais', checkAuth, controlAnimais.getAnimais);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Servidor está escutando na porta 5000...');
});