const db = require("../models/connection");
class ObjectRepository {

    //cresting new object
    static async createObject(name, description, type, location) {
       console.log("name",name)
        const object =  await  db.objects.create({name, description, type, location});
        if(!object) {
            console.log("REPOSITORY no object");
        }
        else{
            console.log("REPOSITORY object: " + object);
        } 
        return object; 
       
    }


  //finding object by id
    static async findObjectById(id){
        const object = await db.objects.findByPk(id);

        if(!object) {
          return "object Not found";
        }
        return object;
      
    }
  

    
    //updating object
    static async updateObject(id, name, description, type, location){
        //checking if object exist first before updating
        const object = await this.findObjectById(id);
        if(!object) {
         return "object Not found";
        }
  
          //updating object with the type and content
        await db.objects.update({name, description, type, location}, {
                  where: { object_id : object.object_id}
        });
       
        //getting back the updated object to be sure it was updated
        const updatedObject = await this.findObjectById(object.object_id);
  
        return updatedObject;
    }
    
    //getting all notification
    static async allObjects(){

        //getting all notification
        const allObjects = await db.objects.findAll();
        
        return allObjects;
    }

     //deleting a notification with id
     static async deleteObject(id){
        const object = await db.objects.findByPk(id);
        if(!object){
            return null
        }

        const status = "inactive";
                //getting all notifications 
        const deletedObject = await db.objects.update({status},
                { where: {
                    object_id: id
                }
        });
        //console.log("del",deletedNUm);
        if(!deletedObject){
            return null
        }
            return deletedObject;
    }

}


// let noel = ProjectRepository.findProjectById(1);
// console.log(noel);
module.exports = ObjectRepository;