
class DataSecurity {
    constructor() { }
   async ssx(userInfo) {
    console.log("ssx", userInfo);
        const whiteListChareckters =  /^[\p{L}0-9@/.-]*$/u;
        for (const key in userInfo) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                if(! whiteListChareckters.test(element))
                    return false;
            }
        }
        return true;
    }
}
module.express =new DataSecurity();


