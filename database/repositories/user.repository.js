const db = require('../models/connection');

class UserRepository {


    //finding project by id   pk(primarykey)
    static async findUserById(id){
        const user = await db.users.findByPk(id);

        if(!user) {
           console.log("User Not found");
           return null;
        }
        return user;
      
    }

    static async findUserByEmail(email){
        const user = await db.users.findOne(
            {where:{email: email}
        });

        if(!user) {
          console.log("User Not found");
          return null;
        }
        console.log(user);
        return user;
    }

     //cresting new user
     static async createUser(first_name,middle_name,last_name,gender,birth_date,email,password) {
       
        const user =  db.users.create({first_name,middle_name,last_name,gender,birth_date,email,password});
        if(!user) {
            console.log("No User");
        }
        else{
            console.log("created User: " + user);
        } 
        return user; 
       
    }

    //updating user using email
  static async updateUser(id, first_name,middle_name,last_name,gender,birth_date,email,password){
    //checking if user exist first before updating
    const user = await this.findUserById(id);
    
    if(!user) {
      console.log("User Not found");
      return null;
    }


    //updating user with the options
  await db.users.update({first_name,middle_name,last_name,gender,birth_date,email,password}, 
        {
          where: { user_id : user.user_id}
    });
 
    //getting back the updated user to be sure it was updated
    const updatedUser = await this.findUserById(user.user_id);

    return updatedUser;
}


  //getting all Users
  static async allUsers(){
    //getting all pojects
      const allUsers = await db.users.findAll();

      return allUsers;
  }

  //deleting a User with id
  static async deleteUser(id){
    const user = await db.users.findByPk(id);
    if(!user){
        return null
    }
    //getting all pojects 
    const status = "inactive";

    const deletedUser = await db.users.update({status}, 
      {
        where: { user_id : id}
  });
    //console.log("del",deletedNUm);
    if(!deletedUser){
        return null;
    }
    return deletedUser;
  }


}

module.exports = UserRepository;