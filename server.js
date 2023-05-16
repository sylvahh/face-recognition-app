const express = require('express');
const bcrypt = require('bcrypt')
const cors = require('cors');
const { signIn, getUsers, createUser, getUserById, updateEntries } = require('./routes');
// const {getUsers, getUserById, createUser, updateEntries, signIn } = require('./Queries');


const app = express()
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())
app.get('/', getUsers)

app.post('/sign-in', signIn)


app.post('/register',createUser)
    
app.get('/user/:id', getUserById)

app.put('/image', updateEntries)

app.listen(3001)

// app.use(express.urlencoded({extended: false}));
// app.use(express.json());