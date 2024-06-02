const {Controller} = require("./Controller");
const usersService = require('../../services/User.service');
class UsersController extends Controller {
    constructor(service) {
        super(service)
    }
    async create( req, res ,next) {
        super.create(req, res, next);
    }
    async delete( req, res,next ) {
        // const  {id}  = req.params;
        // console.log("delete","controller",{id},id);
        // try {
        //     const response = await this.service.delete( {id} );
        //     return res.status( response.statusCode ).json( response );
        // } catch ( error ) {
        //     next( error );
        // }
        console.log("fff");
        super.delete(req, res, next);
    }

}
module.exports = new UsersController(usersService);