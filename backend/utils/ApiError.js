class ApiError extends Error {
    constructor(
        statusCode,
        message = "Error: Something Went Wrong",
        errors = [],

    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
    }
}
export { ApiError };