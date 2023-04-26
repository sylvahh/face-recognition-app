require('dotenv').config();
const bcrypt = require('bcrypt');
const { createUser } = require('./Register');
const { updateEntries } = require('./Entries');
const { getUserById, getUsers } = require('./GetUsers');
const { deleteUser } = require('./DeleteUser');
const { signIn } = require('./Signin');
const { updateUser } = require('./UpdateUser');


module.exports = {
    
    createUser,
updateEntries,
    getUserById,
    getUsers,
deleteUser,
signIn,
updateUser
    
    
}