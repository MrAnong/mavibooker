const { NotificationRepository } = require("../database/export_classes");

class NotificationVerification{

  //Method to create a new project
  static async CreateNotification(type, content){
   
    const notification = await NotificationRepository.createNotification(type, content);
    return notification;
  }

  //method to update notification
  static async UpdateNotification(id, type, content) {
        
    const  notification = await  NotificationRepository.updateNotification(id, type, content);
    if(! notification) {
      return " notification not found";
    }
     
    return  notification;
  }

  static async GetNotification(id){
    
    const notification = await NotificationRepository.findNotificationById(id);
    if(!notification) {
      return "notification not found";
    }
    //console.log("notification",notification)
    return notification;

  }


  static async  AllNotifications(){
    
    const  notifications = await  NotificationRepository.allNotifications();
    if(!notifications) {
      return " notification not found";
    }
    //console.log(" notification", notifications)
    return  notifications;

  }

  static async DeleteNotification(id){
    
    const notification = await NotificationRepository.deleteNotification(id);
    if(!notification) {
      return null;
    }
   // console.log("notification",notification)
    return notification;

  }
    
}

module.exports = NotificationVerification;