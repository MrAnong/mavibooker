const db = require("../models/connection");

class NotificationRepository {

    //cresting new notification
    static async createNotification(type, content) {
       
        const notification = await  db.notifications.create({type, content});
        if(!notification) {
            console.log("REPOSITORY no notification");
        }
        else{
            console.log("REPOSITORY notification: " + notification);
        } 
        return notification; 
       
    }

  //finding notification by id
    static async findNotificationById(id){
        const notification = await db.notifications.findByPk(id);

        if(!notification) {
          return "notification Not found";
        }
        return notification;
      
    }
  

    
    //updating notification
    static async updateNotification(id, type, content){
        //checking if notification exist first before updating
        const notification = await this.findNotificationById(id);
        if(!notification) {
         return "notification Not found";
        }
  
          //updating notification with the type and content
        await db.notifications.update({type, content}, {
                  where: { notif_id : notification.notif_id}
        });
       
        //getting back the updated notification to be sure it was updated
        const updatedNotification = await this.findNotificationById(notification.notif_id);
  
        return updatedNotification;
    }
    
    //getting all notification
    static async allNotifications(){

        //getting all notification
        const allNotifications = await db.notifications.findAll();
        
        return allNotifications;
    }

     //deleting a notification with id
     static async deleteNotification(id){
        const notification = await db.notifications.findByPk(id);
        if(!notification){
            return null
        }
        //getting all notifications 
        const deletedNUm = await db.notifications.destroy({
                where: {
                    id: notification.id
                }
        });
        //console.log("del",deletedNUm);
        if(!deletedNUm){
            return null
        }
            return deletedNUm;
    }

}


// let noel = ProjectRepository.findProjectById(1);
// console.log(noel);
module.exports = NotificationRepository;