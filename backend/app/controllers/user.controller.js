const db = require('../models');
const Users = db.users;
const Op = db.Sequelize.Op;


    exports.findOne= (req, res) => {
        const id = req.params.id;
        Users.findByPk(id)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : "Error retrieving User with id=" + id
            });
        });
      
    };

    exports.findAll= (req, res) => {
        // const id = req.params.id;
        const page = req.query.page?req.query.page:1;
        limit=10;
        Users.findAndCountAll({offset:((page-1)*limit),
        limit : limit})
        .then(data =>{
            var response = {};
            response.success=1;
            response.data=data;

            // response.paging={};
            // response.paging.result_count=data.length;
            // response.paging.result_start=data.length;
            // response.paging.result_end=data.length;
            // response.paging.page_size=data.length;
            // response.paging.page_current=page;
            // response.paging.page_total=data.length;
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(500).send({
                message : "Error retrieving Users"
            });
        });
      
    };

    exports.findFriends = async (req, res) => {
        try{
        const id = req.params.id;
        const data=await Users.findByPk(id);
        if(data.friends){
            let friends_ids_arr=data.friends.split(',');
            const friend_details = await Users.findAll({where : {id:friends_ids_arr}});
            res.send(friend_details)
        }
        console.log(data.friends);
        }
        catch(err){
            res.status(500).send({
                message : "Error retrieving friends of user id"+ id
            });
        }
            
    };

    exports.findFriendOfFriends = async (req, res) => {

        const id = req.params.id;

        try{
        
        const data=await Users.findByPk(id);

        if(data.friends){

            let friends_ids_arr=data.friends.split(',');
            const second_conn = await Users.findAll({
                where : {id:friends_ids_arr},attributes: ['friends']});

                console.log(second_conn);
                var friend_of_friend_ids='';
                second_conn.forEach(data1 => {
                    friend_of_friend_ids += data1.dataValues.friends? data1.dataValues.friends + ',' : '';
                });

            friend_of_friend_ids = friend_of_friend_ids.replace(/,$/,"");
            
            let fof_arr=friend_of_friend_ids.split(',');
            
            let unique_fof_ids=[...new Set(fof_arr)]; //removing duplicate ids if any
            
            let fof_ids_excluding_oneself_and_firstconn = unique_fof_ids.filter(id => id !=req.params.id && !friends_ids_arr.includes(id));
            
            const fof_details = await Users.findAll({
                where : {id:fof_ids_excluding_oneself_and_firstconn}});
            res.status(200).json(fof_details);
        }
        
        }
        catch(err){
            res.status(500).send({
                message : "Error retrieving friends of friends of user id "+ id
            });
        }
            
    };




        // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

        // Tutorial.findAll({ where: condition })
        //     .then(data => {
        //     res.send(data);
        //     })
        //     .catch(err => {
        //     res.status(500).send({
        //         message:
        //         err.message || "Some error occurred while retrieving tutorials."
        //     });
        //     });