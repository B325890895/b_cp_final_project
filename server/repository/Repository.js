const mongoose = require('mongoose');
require("dotenv").config();
class Repository {
    constructor(connection, model) {
        mongoose.connect(connection)
        .then(() => {
            console.log('MongoDB connected');
        }).catch(err => {
            console.error('MongoDB connection error:', err);
        });
        this.model = model;
    }
    async create(data) {
        let object = await this.model.create(data);
        if (object)
            return {json:true,statusCode:200};
        return {json:false,statusCode:500};
    }
    async readAll() {
        //the name of the function that reads all the data
        let objects = await this.model.readAll();
        if (objects)
            return  {json:objects,statusCode:200};
        throw new Error("Couldn't read all");
    }
    // async read(id) {
    //     let object = await this.model.findOne({});
    //     if (object)
    //         return object;
    //     throw new Error('Could not find object'); 
    // }

    async update(id,data) {
        let object = await this.model.updateOne({id:id,data:data});
        if (object)
            return  {json:object,statusCode:200};
        throw new Error('Could not find object with id'+ data.id);

    }
    async delete(id) {
        let object = await this.model.deleteOne({  id: id });
        if (object)
            return {json:object,statusCode:200};
        throw new Error('Could not find object with id ' + id);
    }

    async exist(id){
        const doesObjectExist = await this.model.exists({ id: id })
        if (doesObjectExist) 
            return true;
        return false;
    }

}

module.exports = Repository;