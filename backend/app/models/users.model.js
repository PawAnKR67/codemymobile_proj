module.exports= (sequelize,Sequelize) =>{

    const User = sequelize.define("users",{
        firstName:{
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        avatar: {
            type: Sequelize.STRING
        },
        friends: {
            type: Sequelize.STRING
        }
    });
    return User;
};

// ,
//             autoIncrement: true,
//             primaryKey: true