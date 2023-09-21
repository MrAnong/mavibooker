const express = require('express');
const router = express();
const bodyparser = require('body-parser');
const UserVerification = require('../verification/user.verification');

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

// const options = {
//     method: 'POST',
//     body: JSON.stringify(req.body),
//     headers:{'content-type': 'application/json'},
//     mode: 'no-cors'

//User Signin
router.get('/login', async function(req, res){
    let email = req.body.email;
    let password = req.body.password;
    console.log("password", password);
    const user = await UserVerification.Login(email, password);
    //console.log(user)
    res.send(user);
});



//getting all users
router.get('/all', async function(req, res){
    
    let users = await UserVerification.AllUsers()
    res.send(users);
}); 

//getting a user with id
router.get('/:id', async function(req, res){
    let id = req.params.id
    let user = await UserVerification.GetUser(id)
    res.send(user);
}); 

router.post('/register', async function(req, res){
    let first_name = req.body.first_name
    let middle_name = req.body.middle_name
    let last_name = req.body.last_name
    let gender = req.body.gender
    let birth_date = req.body.birth_date
    let email = req.body.email
    let password = req.body.password
    
    
    let user = await UserVerification.Register(first_name,middle_name,last_name,gender,birth_date,email,password)
    res.send(user);
}); 

 


//Updating a user
router.put('/update/:id', async function(req, res){
   
    let id = req.params.id
    let first_name = req.body.first_name
    let middle_name = req.body.middle_name
    let last_name = req.body.last_name
    let gender = req.body.gender
    let birth_date = req.body.birth_date
    let email = req.body.email
    let password = req.body.password
    
    const user = await UserVerification.UpdateUser(id,first_name,middle_name,last_name,gender,birth_date,email,password);

    res.send(user);
}); 

//deleting a User
router.delete('/delete/:id', async function(req, res){
    let id = req.params.id
    const user = await UserVerification.DeleteUser(id);
    if(user)
        res.status(200).send("deleted User successfully");
    else 
        res.status(404).send("No user found nor deleted");
}); 

module.exports = router;