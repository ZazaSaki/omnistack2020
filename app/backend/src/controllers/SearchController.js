const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/ParseStringAsArray');


module.exports = {
    
    async index(req,res){
        const {latitude, longitude, techs} = req.query;
        
        const techsArray = ParseStringAsArray(techs);

        console.log(techsArray);
        
        //buscar num raio de 10 km
        //Filtrando por tecnologia
        
        
        const devs = await Dev.find({
            techs:{
                $in: techsArray,
            },
            
            location:{
                $near:{
                    $geometry: {
                        type: "Point",
                        coordinates:[longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },});
        console.log(devs);
        return res.json(devs);
        
    }
}