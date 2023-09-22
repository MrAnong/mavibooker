const db = require("../models/connection");
const { Op } = require("sequelize");


class ReservationRepository {


    //cresting new object
    static async createReservation(reservation_day, start, stop, description) {
       
        const reservation = await db.reservations.create({reservation_day, start, stop, description});
        if(!reservation) {
            console.log("error: couldn't create reservation");
        }
        
        return reservation; 
       
    }

  //finding object by id
    static async findReservationById(id){
        const reservation = await db.reservations.findByPk(id);

        if(!reservation) {
          console.log("reservation not found");
        }
        return reservation;
      
    }

    static async findReservationByDateToCreate(reservation_day, start, stop) {

      var can = true;

        const reservations = await db.reservations.findAll({
            where: { reservation_day: reservation_day },
          });
      
          if (!reservations) {
            return can;
          } else {

        
           function convertTime(date){
              const dateParts = date.split(':');
              const newDate = new Date();
              newDate.setHours(dateParts[0]);
              newDate.setMinutes(dateParts[1]);
              return newDate;
            }


            let dbStart = convertTime(reservations[0].start);
            let dbEnd = convertTime(reservations[0].stop);
            let start1 = convertTime(start)
            let stop1 =convertTime(stop)
           
            
        for(let i =0; i < reservations.length; i++){

           dbStart = convertTime(reservations[i].start);
           dbEnd = convertTime(reservations[i].stop);
           start1 = convertTime(start)
           stop1 =convertTime(stop)

           if( ( (dbStart <= start1 ) && (start1 <= dbEnd ) ) || 
               ( (dbStart <= stop1 ) && (stop1 <= dbEnd) ) ||
                  (
                    ( (start1 <= dbStart) && (start1 <= dbEnd) ) &&
                    ( (stop1 >= dbStart) && (stop1 >= dbEnd) )
                  )
             ) {
            can = false;
            return can;
        }
        }

       return can;
          }
    }

    static async findReservationByDateToUpdate(id,reservation_day, start, stop) {
         
       var can = true;

      const reservations = await db.reservations.findAll({
          where: { reservation_day: reservation_day },
        });
    
        if (!reservations) {
          return can;

        } else {

      
         function convertTime(date) {
            const dateParts = date.split(':');
            const newDate = new Date();
            newDate.setHours(dateParts[0]);
            newDate.setMinutes(dateParts[1]);
            return newDate;
          }
          let dbStart = convertTime(reservations[0].start);
          let dbEnd = convertTime(reservations[0].stop);
          let start1 = convertTime(start)
          let stop1 =convertTime(stop)
          
         
          
      for(let i =0; i < reservations.length; i++){

         dbStart = convertTime(reservations[i].start);
         dbEnd = convertTime(reservations[i].stop);
         start1 = convertTime(start)
         stop1 =convertTime(stop)

         if( ( ( (dbStart <= start1 ) && (start1 <= dbEnd ) ) || 
             ( (dbStart <= stop1 ) && (stop1 <= dbEnd) ) ||
                (
                  ( (start1 <= dbStart) && (start1 <= dbEnd) ) &&
                  ( (stop1 >= dbStart) && (stop1 >= dbEnd) )
                ) && ( reservations[i].reserv_id != id ) )
           ) {
            
          can = false;
          return can;
      }
      }
     return can;
        }
  }
  

    
    //updating object
    static async updateReservation(id,reservation_day, start, stop, description){
        
          //updating object with the type and content
        const updatedReservation = await db.reservations.update({reservation_day, start, stop, description}, {
                  where: { reserv_id : id}
        });
       
        return updatedReservation;
        
    }
    
    //getting all notification
    static async allReservations(){

        //getting all notification
        const allReservations = await db.reservations.findAll();
        if(!reservation){
          console.log("no reservations yet");
        }
        return allReservations;
    }

     //deleting a notification with id
     static async deleteReservation(id) {
        const reservation = await db.reservations.findByPk(id);
        if(!reservation){
          console.log("not found");
            return null
        } else {
        const status = "inactive";
        const deletedReserv = await db.reservations.update({status}, {
          where: { reserv_id : id} }
          );
        //console.log("del",deletedNUm);
        if(!deletedReserv){
            return null;
        } else {
        console.log("has been deleted");
            return deletedReserv;
        }
    }
     }
}


// let noel = ProjectRepository.findProjectById(1);
// console.log(noel);
module.exports = ReservationRepository;

