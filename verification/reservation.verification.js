const { ReservationRepository } = require("../database/export_classes");

class ReservationVerification {
  //Method to create a new object
  static async CreateReservation(reservation_day, start, stop, description) {

    const can = await ReservationRepository.findReservationByDateToCreate(reservation_day, start, stop);

     if(can) {
            
        const reservation = await ReservationRepository.createReservation(reservation_day, start, stop, description); 
         return reservation;
        } else {
          const reservation = null;
          console.log("period occupied");
                return reservation;
        }
    
  }

  //method to update object
  static async UpdateReservation(id,reservation_day,start,stop,description) {
     
    const reservation = await ReservationRepository.findReservationById(id);
    if (!reservation) {
      return " reservation not found";
    }

    const can = await ReservationRepository.findReservationByDateToUpdate(reservation.reservation_id,reservation_day,
                                                                                                       start,stop,);
    if(can) {
            
      const updatedReservation = await ReservationRepository.updateReservation(reservation.reservation_id,reservation_day, 
                                                                                        start, stop, description); 
        console.log("updated");
       return updatedReservation;
      } else {
        const updatedReservation = null;
        console.log("period occupied");
              return updatedReservation;
      }
  }

  static async GetReservation(id) {
    const reservation = await ReservationRepository.findReservationById(id);
    if (!reservation) {
      return "reservation not found";
    }
    //console.log("object",object)
    return reservation;
  }
  static async AllReservations() {
    const reservation = await ReservationRepository.allReservations();
    if (!reservation) {
      return " reservation not found";
    }
    //console.log(" object", object)
    return reservation;
  }

  static async DeleteReservation(id) {
    const reservation = await ReservationRepository.deleteReservation(id);
    if (!reservation) {
      return null;
    }
    // console.log("notification",notification)
    return reservation;
  }
}

module.exports = ReservationVerification;
