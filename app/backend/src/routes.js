const {Router} = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();


/*Resume
    // METODOS HTTP :  
        //GET: buscar , POST: definir/adicionar , PUT: editar , DELETE: apagar

    //Tipos de Parametros:
        //Query params : req.query (Filtros, Ordenação, Paginação, ...)
        //Route params : req.params (Identificar um recurso na alteração ou remoção)
        //Body : req.body (Dados para criação ou alteração de um registro)
*/


routes.post('/devs', DevController.store);

routes.get('/devs', DevController.index);

routes.put('/devs/:github_username', DevController.update);

routes.get('/search', SearchController.index)



module.exports = routes;