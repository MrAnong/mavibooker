const express = require('express');
const router = express();
const bodyparser = require('body-parser');
const ObjectVerification = require('../verification/object.verification');
const ObjectRepository = require('../database/repositories/object.repository');

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
//Getting all object
router.get('/all', async function(req, res){
   
    const object = await ObjectVerification.AllObjects();
   
    res.send(object);
});

//getting a object with id
router.get('/:id', async function(req, res){
    let id = req.params.id

    const object = await ObjectVerification.GetObject(id)
    res.send(object);
}); 


//Posting or creating a object
router.post('/new_object', async function(req, res){
    let name = req.body.name
    let description = req.body.description
    let type = req.body.type
    let location = req.body.location

    const object = await ObjectVerification.CreateObject(name, description, type, location)
    res.status(200).send(object);
}); 

//updating a object
router.put('/update/:id', async function(req, res){
    let id = req.params.id
    let name = req.body.name
    let description = req.body.description
    let type = req.body.type
    let location = req.body.location
    
    const object = await ObjectVerification.UpdateObject(id, name, description, type, location);
    res.send(object);
}); 

//deleting a object
router.delete('/delete/:id', async function(req, res){
    let id = req.params.id
    const object = await ObjectVerification.DeleteObject(id);
    if(object)
        res.status(200).send("deleted object successfully!!");
    else
     res.status(404).send("no object found nor deleted");
});

module.exports = router;