const { MongoClient } = require('mongodb');
const axios = require('axios');
const myURL = new URL('http://universities.hipolabs.com/search?');
const paises = ['argentina', 'brazil', 'chile', 'colombia', 'paraguay', 'peru', 'suriname', 'uruguay']

async function main() {
    const uri = "mongodb+srv://teste01:teste01@cluster0.9jziq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri)
    for (let i = 0; i < paises.length; i++) {
        myURL.searchParams.set('country', paises[i]);

        console.log(myURL.href);

        await axios(myURL.toString())
            .then(response => {
                console.log(typeof response)
                copyItems = Object.assign(response.data);
            }
            ).catch();
    }

    try {
        await client.connect();
        const result = await client.db("universities").collection("countries").insertMany(copyItems)
        console.log(result.insertedCount)
    } catch (e) {
        console.error(e);
    }
    finally {
        await client.close();
    }
}
main().catch(console.error);
