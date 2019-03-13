const fs = require('fs');

const stringGenerator = function(sz){
    const numbers = [];
    while (sz--) numbers.push(parseInt( Math.random() * 25 + 97 ))
    return String.fromCharCode(...numbers);
};


const userGenerator = function(sz){
    const users = [];
    for (let i=0; i<sz; ++i) {
        users.push({
            user_id: i,  
            name: stringGenerator(10), 
            siape: stringGenerator(5).toUpperCase(),
            email: stringGenerator(10) + '@' + stringGenerator(5) + '.com',
            password: stringGenerator(8),
            type: Math.random() > 0.5 ? 1 : 0,
        });
    }

    return users;
}


let users = [
    ...userGenerator(10)
];

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

    users.push({
        user_id: user_id,  
        name: user.name, 
        siape: user.siape,
        email: user.email,
        password: user.password,
        type: user.type,
    });

    saveFile();
    return user_id;
};

const saveFile = () => fs.writeFile(
    './users.txt',
     users.map((user)=>JSON.stringify(user)+'\n'),
     (err)=> {
         if (err) 
            console.log("Don't was possible write the data..." + String(err))
     }
);

saveFile();

module.exports = { users, addUser };




