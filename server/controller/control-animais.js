const bd = require('../model/bd');
const Animal = require('../model/animais');

module.exports = {

    addAnimal(req, res) {
        const { nome, latim, habitat, url } = req.body;

        bd.connect()
            .then(() => {
                if (req.session.admin == true) {
                    const novoAnimal = new Animal({
                        nome: nome,
                        url: url,
                        latim: latim,
                        habitat: habitat
                    });
                    novoAnimal.save()
                        .then(() => {
                            return res.status(200).json({ message: 'O animal foi salvado com sucesso.' });
                        })
                        .catch((e) => {
                            return res.status(400).json({ message: 'Erro ao salvar o animal.' });
                        });
                } else {
                    return res.status(403).json({ message: 'Você não é admin.' });
                }
            })
            .catch((e) => {
                return res.status(400).json({ message: 'Erro ao conectar ao banco.' });
            });
    },

    getAnimais(req, res) {
        const { num } = req.body;

        bd.connect()
            .then(() => {
                Animal.aggregate([{ $sample: { size: num } }])
                .then((randomAnimais) => {
                    return res.status(200).json({animais: randomAnimais, message: 'ok'});
                })
                .catch((e) => {
                    return res.status(400).json({message: 'Erro ao buscar os animais.'});
                });
            })
            .catch((e) => {
                return res.status(400).json({message: 'Erro ao conectar ao banco.'})
            });
    }

}