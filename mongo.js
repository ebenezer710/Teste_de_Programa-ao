const { MongoClient } = require('mongodb');
const axios = require('axios');
const myURL = new URL('http://universities.hipolabs.com/search?');//site API
var teste = []
const paises = ['argentina', 'brazil', 'chile', 'colombia', 'paraguay', 'peru', 'suriname', 'uruguay']//LISTA DE PAISES

async function main() {
    const uri = "mongodb+srv://teste01:teste01@cluster0.9jziq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; //CONEXAO COM O BD
    const client = new MongoClient(uri)

    await paises.map(function (value) {
        myURL.searchParams.set('country', value);

        axios(myURL.toString())
            .then(response => {
                var teste1 = response.data //PEGA O CONTEUDO DO SITE, MAS COLOCA DENTRO DE OUTRO OBJETO
                teste1.slice(1,-1) //RETIRA O "[]" DO INICIO E DO FINAL DO CONTEUDO 
                client.connect((err, db) => {
                    const result = client.db("universities").collection("countries").insertMany(teste1) //ADICIONA O OBJETO NO BD 
                });
            }).catch();
    })
}
main().catch(console.error);
