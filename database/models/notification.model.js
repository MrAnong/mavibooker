module.exports = (sequelize, DataTypes) => {

    
//defining the notification model
const Notification = sequelize.define('notification', {
    notif_id: {//in order for the attribute to be saved as the table primary key
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{//inorder for sequelize to maintain the model name as tablename as it by default saves in plural
    freezeTableName: true
});
  
  return Notification;
};