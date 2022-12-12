const bd = require('../model/bd');
const Usuario = require('../model/usuarios');

module.exports = {

    cadastrar(req, res) {
        console.log(req.body);
        const { email, senha } = req.body;
        let isAdmin = false;

        if (email == 'admin' && senha == 'admin'){
            isAdmin = true;
        }

        const novoUsuario = new Usuario({
            email: email,
            senha: senha,
            admin: false
        });

        bd.connect()
            .then(() => {
                Usuario.findOne({ email })
                    .then((user) => {
                        if (user != null) {
                            return res.status(400).json({ message: 'E-mail já cadastrado' });
                        } else {
                            console.log('cadastrar-save')
                            novoUsuario.save()
                                .then(() => {
                                    console.log('usuario cadastrado');
                                    return res.status(200).json({ message: 'O usuário foi cadastrado com sucesso' })
                                })
                                .catch((e) => {
                                    return res.status(400).json({ message: 'Não foi possível cadastrar o usuário.' })
                                });
                        }
                    })
                    .catch((e) => {
                        return res.status(400).json({ message: 'Não foi possível buscar pelo usuário.' })
                    });
            })
            .catch((e) => {
                res.status(400).json({ message: 'Erro ao conectar ao banco.' });
            });
    },

    login(req, res) {
        const { email, senha } = req.body;
        bd.connect()
            .then(() => {
                Usuario.findOne({ email })
                    .then((user) => {
                        if (user.senha == senha) {
                            req.session.authenticated = true;
                            req.session.usuario = email;
                            req.session.admin = user.admin;
                            console.log('o login foi feito com sucesso');
                            return res.status(200).json({ message: 'Login feito com sucesso' });
                        } else {
                            return res.status(401).json({ message: 'Senha incorreta.' });
                        }
                    })
                    .catch((e) => {
                        res.status(400).json({ message: 'Erro ao buscar por usuario.' });
                    });
            })
            .catch((e) => {
                res.status(400).json({ message: 'Erro ao conectar ao banco.' });
            });
    }
}