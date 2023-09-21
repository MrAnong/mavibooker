const { UserRepository } = require("../database/export_classes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "My BaseCamp"


class UserVerification{

    //Create new user
    static async Register(first_name,middle_name,last_name,gender,birth_date,email,password){
      const user = await UserRepository.findUserByEmail(email);
      console.log(user)
      if(user){
        return "User Already Exists"
      }
      else{
        
        const salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        //console.log(hashedPassword, salt);
        const newUser = await UserRepository.createUser(first_name,middle_name,last_name,gender,birth_date,email,hashedPassword)
       return newUser;
      }
       
    }

    
    //Sign in
    static async Login(email, password) {

  
        const user = await UserRepository.findUserByEmail(email);
        console.log(user)
        if(!user) {
          return "Wrong Email or password"
        }
       
        let matched = bcrypt.compare(password, user.password);
  
        if(!matched){
          return "Wrong Email or password"
        }
        //Generate a token for the user loging in using user id
        var token = jwt.sign({ user_id: user.user_id }, secret, {
          expiresIn: 8640 // 24 hours
        });
        
        user.dataValues.token = token;
  
        return user;
  
      }
      
    //Update user
    static async UpdateUser(id, first_name,middle_name,last_name,gender,birth_date,email,password) {
        
      const user = await UserRepository.updateUser(id, first_name,middle_name,last_name,gender,birth_date,email,password);
      if(!user) {
        return "user not found"
      }

        console.log("service user", user);
      return user;
    }

    //Get User
    static async GetUser(id) {
        
      const user = await UserRepository.findUserById(id);
      if(!user) {
        return "user not found"
      }

        //console.log("service user", user);
      return user;
    }

    //Getting all users 
    static async AllUsers() {
        
      const users = await UserRepository.allUsers();
      if(!users) {
        return "users not found"
      }

        //console.log("service user", user);
      return users;
    }

    //Delete User
    static async DeleteUser(id){
    
      const user = await UserRepository.deleteUser(id);
      if(!user) {
        return null;
      }
    
      return user;
  
    }

    
    
    // static async createUser(username, password, firstame, lastname,email, is_admin){
    //   const user = await UserRepository.CreateUser(username, password, firstame, lastname,email, is_admin)
    // }
    // static async createUser(username, password, firstame, lastname,email, is_admin){
    //   const user = await UserRepository.CreateUser(username, password, firstame, lastname,email, is_admin)
    // }

}
module.exports = UserVerification;