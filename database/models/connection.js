
const  Sequelize = require('sequelize');
const {DataTypes} = Sequelize;
const db = {};

//creating a sequelize object which has as attributes the various configurations for the database connection
const sequelize = new Sequelize(
    'db_mavibooker', //db name
    'root', //db user 
    '', //password
    {
    host: 'localhost',
    dialect: 'mysql'
});

//a little function to check if connection successful 
async function myfunction() {
    await sequelize.authenticate();
    console.log("Connection successful");
}

myfunction();

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//calling the model functions to execute table creation
db.users = require('./user.model')(sequelize,DataTypes);
db.objects = require('./object.model')(sequelize,DataTypes);
db.reservations = require('./reservation.model')(sequelize, DataTypes);
db.notifications = require('./notification.model')(sequelize,DataTypes);

//creating relations between tables

//user.1 - M.object  --create
db.users.hasMany(db.objects);
db.objects.belongsTo(db.users);

//object.1 -  M.reservations  --concern
db.objects.hasMany(db.reservations);
db.reservations.belongsTo(db.objects);

//user.1 - M.reservation  --create
db.users.hasMany(db.reservations);
db.reservations.belongsTo(db.users);

//user.1 - M.reservation  --override
db.users.hasMany(db.reservations);
db.reservations.belongsTo(db.users);

//user.M - M.notification  --receive
const Us_No = sequelize.define('us_no', {
        id: {//in order for the attribute to be saved as the table primary key
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
},
{    //inorder for sequelize to maintain the model name as tablename as it by default saves in plural
    freezeTableName: true
});
  

db.users.belongsToMany(db.notifications, { through: Us_No});
db.notifications.belongsToMany(db.users, { through: Us_No});

Us_No.belongsTo(db.users);
Us_No.belongsTo(db.notifications);

//reservation.M - M.notification  --emit
const Res_Not = sequelize.define('res_not', {
    id: {//in order for the attribute to be saved as the table primary key
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
}
},
{    //inorder for sequelize to maintain the model name as tablename as it by default saves in plural
freezeTableName: true
});


db.reservations.belongsToMany(db.notifications, { through: Res_Not});
db.notifications.belongsToMany(db.reservations, { through: Res_Not});

Res_Not.belongsTo(db.reservations);
Res_Not.belongsTo(db.notifications);





//sync() : only creates the table if it doesn't exist
//sync({force: true}) : creates the table anyways, but drops it first if it already exists
//sync({alter: true}) : alters the existing table with the information. doesn't drop, doesnt create new

//after defining the model, we sync them with the database so the changes are applied to the database and this returns a promise(.then)
db.users.sync().then((data) => {
    console.log("User table and model synced successfully");
}).catch((err) => {
    console.log("error syncing the User table and model");
});
//syncing the object table and model
db.objects.sync().then((data) => {
    console.log("object table and model successfully synced");
}).catch((err) => {
    console.log("error syncing the object table and model");
});
//syncing the notification table and model
db.notifications.sync().then((data) => {
    console.log("Notification table and model synced successfully");
}).catch((err) => {
    console.log("error syncing the Notification table and model");
});
//syncing the reservation table and model
db.reservations.sync().then((data) => {
    console.log("Reservation table and model successfully synced");
}).catch((err) => {
    console.log("error syncing the Reservation table and model");
});
Us_No.sync().then((data) => {
    console.log("User_Notification table and model synced successfully");
}).catch((err) => {
    console.log("error syncing the User_Notification table and model");
});
Res_Not.sync().then((data) => {
    console.log("Reservation_Notification table and model synced successfully");
}).catch((err) => {
    console.log("error syncing the Reservation_Notification table and model");
    console.log(err);
});



module.exports = db;


console.log("lol");