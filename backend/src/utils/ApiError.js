class ApiError extends Error{
    constructor(
        statuscode,
        message="Something is going wrong",
        error=[],
        stack=""
    ){
        super(message)
        this.statuscode = statuscode
        this.data = null
        this.message = message
        this.success = false
        this.error = error

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}