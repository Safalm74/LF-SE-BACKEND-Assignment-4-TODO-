export class BaseError extends Error{
    constructor(messsage= " "){
        super(messsage);
        this.message=messsage;
    }
}