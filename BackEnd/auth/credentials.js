// 
//  This file is responsible to connect the authentication with the database
//  and in this way, create a isolation between them.
// 
//  This handle the cryptography too.
// 
//  Written by Matheus Cândido Teixeira
//  Date: 22.03.2019
// 


//---------------- imports ----------------//

// ---- core imports
const fs = require('fs');
const crypto = require('crypto');

// ---- third party imports
const bcrypt = require('bcrypt');



// ------- constants definitions ------- //
const saltRounds = 8; // This protect against brutalforce attack



// Just for test purposes
// 
//  This function generate a random string with size specified
//  by the parameter "sz"
const stringGenerator = function(sz){
    const numbers = [];
    while (sz--) numbers.push(parseInt( Math.random() * 25 + 97 ))
    return String.fromCharCode(...numbers);
};


//  Just for test purposes
// 
//  This function populates the system with random user credentials
//  The number of generated users is specified by the parameter "sz"
const userGenerator = function(sz){
    const users = [];
    for (let i=0; i<sz; ++i) {
        const hmac = crypto.createHmac('sha512', 'MGMmgmMGMmgmMGMmgm');
        hmac.update(stringGenerator(8));
        users.push({
            user_id: i,  
            name: stringGenerator(10), 
            siape: stringGenerator(5).toUpperCase(),
            email: stringGenerator(10) + '@' + stringGenerator(5) + '.com',
            password: bcrypt.hashSync(hmac.digest('hex'), saltRounds),
            type: Math.random() > 0.5 ? 1 : 0,
        });
    }

    return users;
}


//  Just for test purposes
// 
// I know "Never/Avoid create global variables" ...
// This was only to accelerate the development process
//   Forgive me about this...
let users = [
    ...userGenerator(10)
];


/**
 * Find if there is an user with this credentials
 * @param {string} username - user name
 * @param {string} password - password
 * @returns {boolean} Success of operation
 */
const authUser = (siape, password) => {
    for (let user of users){
        const is_password_equal = bcrypt.compareSync(password, user.password);
        if (user.siape === siape &&  is_password_equal) {
            return user.user_id;
        }
    }

    return null;
}

// Just for test purposes
// 
// This function register some users specified by the parameter "user"
const addUser = (user) => {
    const user_id = users.length;

    let fail = false;

    users.forEach( _user => {
        if ( _user.siape === user.siape ||
             _user.email === user.email )
            
             fail = true;
    });
    
    if (fail) {
        return null;
    } 

    // console.log(user.password);
    bcrypt.hash(user.password, saltRounds)
        .then(hash => {
            users.push({
                user_id: user_id,  
                name: user.name, 
                siape: user.siape,
                email: user.email,
                password: hash,
                type: user.type,                
            });
            saveFile();
        })
        .catch(err => {
            throw new Error('Invalid user password')
        });
    
    

    
    return user_id;
};


// Just for test purposes
// 
// This function just save the users in a file
const saveFile = () => fs.writeFile(
    './users.txt',
     users.map((user)=>JSON.stringify(user)+'\n'),
     (err)=> {
         if (err) 
            console.log("Don't was possible write the data..." + String(err))
     }
);

saveFile();

module.exports = { addUser, authUser };




