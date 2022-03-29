const { MongoClient } = require('mongodb');
const axios = require('axios');
const myURL = new URL('http://universities.hipolabs.com/search?');
var teste = []
const paises = ['argentina', 'brazil', 'chile', 'colombia', 'paraguay', 'peru', 'suriname', 'uruguay']

async function main() {
    const uri = "mongodb+srv://teste01:teste01@cluster0.9jziq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri)

    await paises.map(function (value) {
        myURL.searchParams.set('country', value);

        axios(myURL.toString())
            .then(response => {
                copyItems = Object.assign({}, response.data) ;

                //console.log(typeof copyItems)
                teste.push(copyItems)
                //console.log(teste)
                //return(teste)
                
            }).catch();
    })

     client.connect((err, db) => {
        //teste = Object.assign({}, teste);
        

        //console.log(teste)
        //console.log( teste)
        const result = client.db("universities").collection("countries").insertMany(teste)
        
        console.log(typeof result)
    });
}
main().catch(console.error);
