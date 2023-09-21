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
   
    const reservation = await ReservationRepository.allReservations();
   
    res.send(reservation );
});

//getting a reservation  with id
router.get('/:id', async function(req, res){
    let id = req.params.id
  
    const reservation  = await ReservationVerification.GetReservation(id)
    res.send(reservation );
}); 


//Posting or creating a reservation 
router.post('/new_reservation', async function(req, res){
    let reservation_day = req.body.reservation_day
    let start = req.body.start
    let stop = req.body.stop
    let description = req.body.description

    const reservation  = await ReservationVerification.CreateReservation(reservation_day, start, stop, description);
    res.status(200).send(reservation );
}); 

//updating a reservation 
router.put('/update/:id', async function(req, res){
    let id = req.params.id
    let reservation_day = req.body.reservation_day
    let start = req.body.start
    let stop = req.body.stop
    let description = req.body.description
    
    const reservation  = await ReservationVerification.UpdateReservation(id, reservation_day, start, stop, description);
    res.send(reservation );
}); 

//deleting a reservation 
router.delete('/delete/:id', async function(req, res){
    let id = req.params.id
    const reservation = await ReservationVerification.DeleteReservation(id);
    if(reservation )
        res.status(200).send("deleted reservation  successfully!!");
    else
     res.status(404).send("no reservation  found nor deleted");
});

module.exports = router;