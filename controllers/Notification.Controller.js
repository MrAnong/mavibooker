const express = require('express');
const router = express();
const bodyparser = require('body-parser');
const NotificationRepository = require('../database/repositories/notification.repository');
const NotificationVerification = require('../verification/notification.verification');

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

//Getting all notification
router.get('/all', async function(req, res){
   
    const notification = await NotificationVerification.AllNotifications();
   
    res.send(notification);
});

//getting a notification with id
router.get('/:id', async function(req, res){
    let id = req.params.id
  
    const notification = await NotificationVerification.GetNotification(id);
    res.send(notification);
}); 


//Posting or creating a notification
router.post('/new_notification', async function(req, res){
    let type = req.body.type
    let content = req.body.content

    const notification = await NotificationVerification.CreateNotification(type, content)
    res.status(200).send(notification);
}); 

//updating a notification
router.put('/update/:id', async function(req, res){
    let id = req.params.id
    let type = req.body.type
    let content = req.body.content
    
    const notification = await NotificationVerification.UpdateNotification(id, type, content);
    res.send(notification);
}); 

//deleting a notification
router.delete('/delete:id', async function(req, res){
    let id = req.params.id
    const notification = await NotificationVerification.DeleteNotification(id);
    if(notification)
        res.status(200).send("deleted notification successfully!!");
    else
     res.status(404).send("no notification found nor deleted");
});


module.exports = router;