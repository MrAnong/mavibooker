module.exports = (sequelize, DataTypes) =>
{

//to define the object model for the database
const Object = sequelize.define('object', {
    object_id: {//in order for the attribute to be saved as the table primary key
           type: DataTypes.INTEGER,
           primaryKey: true,
           autoIncrement: true
       },
           name: {
               type: DataTypes.STRING,
               allowNull: false
           },
           description: {
               type:  DataTypes.STRING,
               allowNull: false
           },
           type: {
               type: DataTypes.STRING,
               allowNull: false
           },
           location: {
               type: DataTypes.STRING,
               allowNull: false
           },
           status: {
                type: DataTypes.STRING,
                defaultValue: 'active'
           }
   },
   {//inorder for sequelize to maintain the model name as tablename as it by default saves in plural
       freezeTableName: true
   });

    return Object;
};
   