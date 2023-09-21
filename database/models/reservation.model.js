module.exports = (sequelize, DataTypes) => {

    
//defining the reservation model
const Reservation = sequelize.define('reservation', {
    reserv_id: {//in order for the attribute to be saved as the table primary key
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    reservation_day: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    start: {
        type: DataTypes.TIME,
        allowNull: false
    },
    stop: {
        type: DataTypes.TIME,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: 'standard'
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active'
    }
},
{//inorder for sequelize to maintain the model name as tablename as it by default saves in plural
    freezeTableName: true
});

   return Reservation;
};