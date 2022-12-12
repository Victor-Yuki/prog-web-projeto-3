const bd = require('../model/bd');
const Animal = require('../model/animais');

module.exports = {

    addAnimal(req, res) {
        const { nome, latim, habitat, url } = req.body;

        bd.connect()
            .then(() => {
                console.log(req.session.admin)
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
                Animal.find()
                .then((animais) => {
                    const randomAnimais = animais.sort(() => 0.5 - Math.random()).slice(0, num);
                    //console.log(randomAnimais);
                    return res.status(200).json({animais: randomAnimais, message: 'ok'});
                })
                .catch((e) => {
                    return res.status(400).json({message: 'Erro ao buscar os animais.'});
                });
            })
            .catch((e) => {
                return res.status(400).json({message: 'Erro ao conectar ao banco.'})
            });
    },

    populateBD() {
        bd.connect()
            .then(() => {
                const elefante = new Animal({
                    nome:'elefante',
                    habitat: 'savana',
                    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/200px-African_Bush_Elephant.jpg',
                    latim: 'elephantus'
                });
                const elefante2 = new Animal({
                    nome:'elefante1',
                    habitat: 'savana',
                    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/200px-African_Bush_Elephant.jpg',
                    latim: 'elephantus'
                });
                const elefante3 = new Animal({
                    nome:'elefante2',
                    habitat: 'savana',
                    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/200px-African_Bush_Elephant.jpg',
                    latim: 'elephantus'
                });
                const elefante4 = new Animal({
                    nome:'elefante3',
                    habitat: 'savana',
                    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/200px-African_Bush_Elephant.jpg',
                    latim: 'elephantus'
                });
                const elefante5 = new Animal({
                    nome:'elefante4',
                    habitat: 'savana',
                    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/200px-African_Bush_Elephant.jpg',
                    latim: 'elephantus'
                });
                const urso = new Animal({
                    nome:'urso polar',
                    habitat: 'polo norte',
                    url:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Polar_Bear_-_Alaska_%28cropped%29.jpg/280px-Polar_Bear_-_Alaska_%28cropped%29.jpg', 
                    latim: 'polaris ursus'
                });
                Animal.insertMany([elefante,elefante2,elefante3,elefante4,elefante5,urso], (err)=>{
                    if(err){
                        console.log(err)
                    } else {
                        console.log('Sucesso em adicionar elefante e urso');
                    }
                })
            })
            .catch(e => {
                console.log('Erro em popular o bd');
            })
    }

}