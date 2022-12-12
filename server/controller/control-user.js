const bd = require('../model/bd');
const Usuario = require('../model/usuarios');

module.exports = {

    cadastrar(req, res) {
        const { email, senha } = req.body;

        const novoUsuario = new Usuario({
            email: email,
            senha: senha
        });

        bd.connect()
            .then(() => {
                novoUsuario.save()
                    .then(() => {
                        return res.status(200).json({ message: 'O usuário foi cadastrado com sucesso' })
                    })
                    .catch((e) => {
                        return res.status(400).json({ message: 'Não foi possível cadastrar o usuário.' })
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
                            req.session.isAdmin = user.admin;
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