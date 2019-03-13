
/**
 * This class represents an user of this system. 
 * 
 * This is might be used to manage user data like email, password
 * name, SIAPE e etc. 
 * 
 */

class User{
    constructor(user_id){
        this.id = user_id;
    }

    get name(){
        return this.__name;
    }

    set name(param){
      if (param == null) throw Error('Invalid Name: null parameter');

      this.__name = param;
    }

    get SIAPE(){
        return this.__SIAPE;
    }

    set SIAPE(param){
        if (param == null) throw Error('Invalid SIAPE: null parameter');
        
        this.__SIAPE = param;
    }

    get email(){
        return this.__email;
    }

    set email(param){
        if (param == null) throw Error('Invalid E-mail: null parameter');

        this.__email = param;
    }

    set password(param){
        if (param == null   ) throw Error('Invalid Password: null parameter');
        if (param.length < 7) throw Error('Invalid Password: Very small password');

        this.__password = password;
    }

}

module.exports = User;