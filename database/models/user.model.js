module.exports = (sequelize, DataTypes) => {

//to define the user model for the database
const User = sequelize.define('user', {
    user_id: {//in order for the attribute to be saved as the table primary key
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    middle_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING
    },
    birth_date: {
        type: DataTypes.DATE
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'client'
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active'
    }
}, 
    {//inorder for sequelize to maintain the model name as tablename as it by default saves in plural
        freezeTableName: true
    });

    return User;
};
