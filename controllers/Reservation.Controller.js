const express = require('express');
const router = express();
const bodyparser = require('body-parser');
const ReservationRepository = require('../database/repositories/reservation.repository');
const ReservationVerification = require('../verification/reservation.verification');


const verifyRequest = (req, res, next) => {
    if (!req.body) {
      res.status(400).send('Invalid request data');
    } else {
      next();
    }
  };
  

router.use(bodyparser.json());
router.use(verifyRequest);
router.use(bodyparser.urlencoded({
    extended : true,
})
);

//Getting all reservation 
router.get('/all', async function(req, res){
   
    const reservation = await ReservationVerification.AllReservations();

   if(!reservation) {
    res.send("Sorry there have been no reservations made at the moment. please try again later");
   } else {
    res.status(200).send(reservation);
   }
});

//getting a reservation  with id
router.get('/:id', async function(req, res){
    let id = req.params.id
  
    const reservation  = await ReservationVerification.GetReservation(id)
    if(!reservation) {
        res.send("Sorry there exists no such reservation. please try finding another");
       } else {
        res.status(200).send(reservation);
       }
}); 


//Posting or creating a reservation 
router.post('/new_reservation', async function(req, res){
    let reservation_day = req.body.reservation_day
    let start = req.body.start
    let stop = req.body.stop
    let description = req.body.description

    const reservation  = await ReservationVerification.CreateReservation(reservation_day, start, stop, description);
    if(!reservation) {
        res.send("Sorry, the period you specified is already taken. please enter another period");
       } else {
        console.log("The reservation has been created successfully");
        res.status(200).send(reservation);
       }
}); 

//updating a reservation 
router.put('/update/:id', async function(req, res){
    let id = req.params.id
    let reservation_day = req.body.reservation_day
    let start = req.body.start
    let stop = req.body.stop
    let description = req.body.description
    
    const reservation  = await ReservationVerification.UpdateReservation(id, reservation_day, start, stop, description);
    if(!reservation) {
        res.send("Sorry, the reservation couldn't be updated");
       } else {
        console.log("The reservation has been updated successfully");
        res.status(200).send(reservation);
       }
}); 

//deleting a reservation 
router.delete('/delete/:id', async function(req, res){
    let id = req.params.id
    const reservation = await ReservationVerification.DeleteReservation(id);
    if(!reservation) {
        res.send("Sorry, the reservation couldn't be updated");
       } else {
        console.log("The reservation has been updated successfully");
        res.status(200).send(reservation);
       }
});

module.exports = router;