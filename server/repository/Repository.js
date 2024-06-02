const mongoose = require('mongoose');
require("dotenv").config();
class Repository {

    constructor(connection, collection, model) {
        console.log("repository");
        console.log(connection);
        mongoose.connect(connection
        //     , {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // }
    ).then(() => {
            console.log('MongoDB connected');
        }).catch(err => {
            console.error('MongoDB connection error:', err);
        });
        this.model = model;
    }
    async create(data) {
        let object = await this.model.create(data);
        if (object)
            return true;
        return false;
    }
    async readAll() {
        //the name of the function that reads all the data
        let objects = await this.model.readAll();
        if (objects)
            return objects;
        throw new Error("Couldn't read all");
    }
    async read(id) {
        let object = await this.model.findOne({});
        if (object)
            return object;
        throw new Error('Could not find object'); 
    }

    async update(id,data) {
        let object = await this.model.updateOne({id:id,data:data});
        if (object)
            return object;
        throw new Error('Could not find object with id'+ data.id);

    }
    async delete(id) {
        console.log(id);
        let object = await this.model.deleteOne({  user_id: id });
        if (object)
            return object;
        throw new Error('Could not find object with id ' + id);
    }

    async exist(id){
        const doesObjectExist = await this.model.exists({ user_id: id })
        if (doesObjectExist) 
            return true;
        return false;
    }

}

module.exports = Repository;