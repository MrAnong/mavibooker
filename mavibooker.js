const express = require('express');
const app = express();
const port = 3000;

const session = require('express-session');

const userController = require('./controllers/User.Controller');
const objectController = require('./controllers/Object.Controller');
const notificationController = require('./controllers/Notification.Controller');
const reservationController = require('./controllers/Reservation.Controller');
app.use(express.urlencoded({extended: false}));

app.use("/users", userController);
app.use("/objects", objectController);
app.use("/notifications", notificationController);
app.use("/reservations", reservationController); 

app.use(session({
    secret: 'webslesson',
    resave: true,
    saveUninitialized: true
}));




app.listen(port, () => console.log(`server is now listening on port ${port}`));