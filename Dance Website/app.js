const express = require('express')
const path = require("path")
const app = express()
const port = 80
const mongoose = require('mongoose');
const bodyparser = require('body-parser')


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');  // connect to db
}

// define mongoose schema 
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
});


const contact = mongoose.model('contact', contactSchema);




app.use(express.urlencoded()) // middleware for getting data

// static
app.use("/static",express.static('static'))  // serving static file 

// PUG
app.set('view engine', 'pug')  // set template engine for pug
app.set("views",path.join(__dirname,"views"))  // set the views directory



app.get('/', (req, res) => {
    params = {
        
    }
  res.status(200).render("index.pug",params)
})

app.get('/about',(req,res) => {
    res.render("about.pug")
})

app.get('/contact', (req, res) => {
    res.status(200).render("contact.pug")
})

app.post('/contact', (req, res) => {
    console.log(req.body)
    var myData = new contact(req.body)
    myData.save().then(()=>{
      res.send("This data has been send to database")
    }).catch(()=>{
      res.status(404).send("Items was not save")
    })

    // res.status(200).render("contact.pug")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})