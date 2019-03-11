const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const dotenv = require('dotenv');
dotenv.config();

const signin = require('./controllers/signin');
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const PORT = process.env.PORT;

const db = knex ({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : process.env.USER,
      password : process.env.PASSWORD,
      database : 'find-face-db'
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send(database.users) })

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleAPICall(req, res)})


app.listen(PORT, ()=> {

    console.log(`app is running on port ${PORT}`);
})

