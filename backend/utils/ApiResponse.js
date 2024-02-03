class ApiResponse {
    constructor(
        status,
        message = "Success",
        data = []
    ) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}

export { ApiResponse };