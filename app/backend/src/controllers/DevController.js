const axios = require('axios');
const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/ParseStringAsArray');

// index: mostrar lista, 
//show: mostrar um unico, 
//store: guardar, 
//update: alterar, 
//destroy: apagar

module.exports = {
    
    async index(req,res){
        const dev = await Dev.find();

        return res.json(dev);
    },
    
    async store (req, res){ 
        //Ler o body
        const {github_username, techs, latitude, longitude} = req.body;
        
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
           //importar e usar api
            const axios = require('axios');
            const responseApi = await axios.get(`https://api.github.com/users/${github_username}`);
            const {name, login, avatar_url, bio} = responseApi.data;
        
            //Split : String to array
            const techsArray = ParseStringAsArray(techs);
            
            //Getting the name
            const finalNAme = (name != null) ? name : login;
            
            //get location
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            
            dev = await Dev.create({
                finalNAme,
                github_username, 
                bio,
                avatar_url,
                techs : techsArray,
                location,
            })
         
        }
        
    return res.json(dev);
    },

    async update(req, res){
        console.log(req.params);
        
        const {github_username} = req.params;
        let {name, bio, avatar_url} = req.body;
        console.log(github_username);
        
        const dev = await Dev.find({
            github_username : {
                $eq : github_username,
            }
        });
        console.log(dev);

        name = name==null? dev.name : name;
        console.log(dev.name);
        bio = bio==null? dev.bio : bio;
        console.log(dev.bio);
        avatar_url = avatar_url==null? dev.avatar_url : avatar_url;
        
        
        const newDev = await Dev.findOneAndUpdate({
            github_username:{
                $eq : github_username,
                },
            },
            
        { name : name,
            bio:bio,
            avatar_url:avatar_url
            });

        
        
        return res.json({newDev});
    }
}