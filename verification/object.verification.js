const { ObjectRepository } = require("../database/export_classes");

class ObjectVerification{

  //Method to create a new object
  static async CreateObject(name, description, type, location){
   
    const object = await ObjectRepository.createObject(name, description, type, location);
    return object;
  }

  //method to update object
  static async UpdateObject(id, name, description, type, location) {
        
    const  object = await  ObjectRepository.updateObject(id, name, description, type, location);
    if(! object) {
      return " object not found";
    }
     
    return  object;
  }

  static async GetObject(id){
    
    const object = await ObjectRepository.findObjectById(id);
    if(!object) {
      return "object not found";
    }
    //console.log("object",object)
    return object;

  }
  static async  AllObjects(){
    
    const  object = await  ObjectRepository.allObjects();
    if(! object) {
      return " object not found";
    }
    //console.log(" object", object)
    return  object;

  }

  static async DeleteObject(id){
    
    const object = await ObjectRepository.deleteObject(id);
    if(!object) {
      return null;
    }
   // console.log("notification",notification)
    return object;

  }
    
}

module.exports = ObjectVerification;