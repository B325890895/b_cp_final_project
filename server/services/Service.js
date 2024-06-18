//const dataSecurity = require('./dataSecurity');
class Service {

    constructor(repository) {
        this.repository = repository;
    }

    async readAll(parametersForQuery) {
        return this.repository.readAll(parametersForQuery)
    }


    async read(id) {
        return this.repository.read(id)
    }

    async create(data) {
        return this.repository.create(data)
    }

    async update(id, data) {
        // if(dataSecurity.ssx(id)) {
        //to make shore theire is no securety problomes with the id parameter
        //make sure no securety problom with object (data)
        // }
        if (await this.repository.exist(id))
            return this.repository.update(id, data);
        throw new Error('Could not find');
    }

    async delete(id) {
        // if(dataSecurity.ssx(id)) {
        //to make shore theire is no securety problomes with the id parameter
        // }
        console.log("delete", "service");
        if (this.repository.exist(id))
            return this.repository.delete(id)
        throw new Error('Could not find');
    }

    async inputValidity(type, str) {
        console.log(type, str, "inputvalidity");
        const usernameRegexHE = /^[א-ת]+$/;
        const usernameRegexEN = /^[a-zA-Z]+$/;
        // let id = String(id).trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
        const addressRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const HMO = ['מאוחדת', 'לאומית', 'כללית', 'מכבי'];

        switch (type) {

            case 'name' || 'fatherName' || 'motherName':
                return (usernameRegexHE.test(str) || usernameRegexEN.test(str));
            case 'id':
                if (id.length > 9 || id.length < 5 || isNaN(id)) return false;
                id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
                return Array
                    .from(id, Number)
                    .reduce((counter, digit, i) => {
                        const step = digit * ((i % 2) + 1);
                        return counter + (step > 9 ? step - 9 : step);
                    }) % 10 === 0;
            case 'date' || 'birthDate':
                return !isNaN(new Date(str));
            case 'email':
                return emailRegex.test(str);
            case 'phone':
                return phoneRegex.test(str);
            case 'address':
                return addressRegex.test(str);
            case 'HMO':
                return HMO.includes(str);

            default:
                throw new Error('Invalid input type');
        }
    }

    async ssxDataSecurity(data) {
        console.log("ssx", data);
            const whiteListCharacters = /^[\p{L}\p{Script=Hebrew}0-9@/.-]*$/u;
            for (const key in data) {
                if (Object.hasOwnProperty.call(object, key)) {
                    const element = object[key];
                    if(! whiteListCharacters.test(element))
                        return false;
                }
            }
            return true;
        }
}
module.exports = { Service };