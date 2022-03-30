const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://teste01:teste01@cluster0.9jziq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(uri, (err, client) => {
  if (err) return console.log(err)
  db = client.db('universities') // coloque o nome do seu DB

  app.listen(3000, () => {
    console.log('Server running on port 3000')
  })
})

//Tipo de template engine
app.set('view engine', 'ejs')

app.route('/') //setado a rota, e abaixo as ações a serem tomadas dentro desta rota
.get(function(req, res) {
    console.log('1')
  const cursor = db.collection('countries').find()
  res.render('index.ejs')
})

.post((req, res) => {
    console.log('2')
  db.collection('countries').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('Salvo no Banco de Dados')
    res.redirect('/show')
  })
})

app.route('/show')
.get((req, res) => {
    console.log('3')
  db.collection('countries').find().toArray((err, results) => {
    if (err) return console.log(err)
    res.render('show.ejs', { data: results })
  })
})

app.route('/edit/:id')
.get((req, res) => {
    console.log('4')
  var id = req.params.id

  db.collection('countries').find(ObjectId(id)).toArray((err, result) => {
    if (err) return res.send(err)
    res.render('edit.ejs', { data: result })
  })
})
.post((req, res) => {
    console.log('5')
  var id = req.params.id
  var name = req.body.name
  var country = req.body.country
  var alpha_two_code = req.body.alpha_two_code

  db.collection('countries').updateOne({_id: ObjectId(id)}, {
    $set: {
      name: name,
      country: country,
      alpha_two_code: alpha_two_code 
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/show')
    console.log('Atualizado no Banco de Dados')
  })
})

app.route('/delete/:id')
.get((req, res) => {
    console.log('6')
  var id = req.params.id

  db.collection('countries').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/show')
  })
})