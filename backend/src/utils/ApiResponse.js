class ApiResponse{
    constructor(statuscode, data , message="Sucess"){
        this.statuscode = statuscode;
        this.message = message;
        this.data = data;
        this.success = statuscode < 400;
    }
}

export {ApiResponse}