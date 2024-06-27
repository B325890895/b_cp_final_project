class Controller {
  constructor(service) {
    this.service = service;
  }
  async readAll(req, res, next) {
    try {
      const response = await this.service.readAll(req.query);
      return res.status(response.statusCode).json(response.json);
    } catch (error) {
      next(error);
    }
  }

  async read(req, res, next) {
    const { id } = req.params;
    try {
      const response = await this.service.read(id);
      return res.status( response.statusCode ).json( response.json );
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const response = await this.service.create(req.body);
      if (response) {
              return res.status( response.statusCode ).json( response.json );
      }
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    console.log("update controller");
    const { id } = req.params;
    try {
      const response = await this.service.update(id, req.body);
      return res.status( response.statusCode ).json( response.json );
    } catch (error) {
      next(error);
    }
  }

    async delete( req, res,next ) {
        console.log("deletecotroller");
        const  {id}  = req.params;
        console.log(this.service);
        try {
            const response = await this.service.delete(id);
            return res.status( response.statusCode ).json( response.json );

        } catch ( error ) {
            next( error );
        }
    }

}

module.exports = { Controller };
