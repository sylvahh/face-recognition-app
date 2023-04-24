const express = require('express');
const bcrypt = require('bcrypt')
const cors = require('cors')
const {getUsers, getUserById, createUser, updateEntries, signIn } = require('./Queries');

const data = {
    users: [
        {
            id: '1',
            name: 'sully',
            password: 'sullyking',
            email: 'sully@gmail.com',
            entries: 0,
            createdAt: new Date()
        },
        {
            id: '2',
            name: 'benny',
            password: 'kingB',
            email: 'benny@gmail.com',
            entries: 0,
            createdAt: new Date()
        },
        {
            id: "3",
            name: "sylvahh",
            password: "$2b$10$IWXPt0WvP9yLuAf8wp76q./gkXf5Upfxz92oNqo.SJoOgRPflE5Zi",
            email: "sylvesterchambers03@gmail.com",
            entries: 0,
            createdAt: "2023-04-10T19:49:20.320Z"
        }
    ]
}

const app = express()
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())
app.get('/', getUsers)

app.post('/sign-in', signIn)

// app.post('/sign-in', (req, res) => {
//     const { id, name, password  } = data.users[2]
//     if (req.body.name === name && bcrypt.compareSync(req.body.password,password)) {
//         res.json({
//             success: true,
//             message: 'success',
//             data: {
//                 id: id
//             }
//         })
//     } else {
//         res.status(400).json('invalid password')
//         // res.send("success!!")
//     }
// })

app.post('/register',createUser)
    
app.get('/user/:id', getUserById)

app.put('/image', updateEntries)

app.listen(3001)

// app.use(express.urlencoded({extended: false}));
// app.use(express.json());