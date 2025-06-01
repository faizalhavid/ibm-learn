import { ErrorResponse } from "../types/api-response";

export class ApiErrorResponse implements ErrorResponse {
    success = false as const;
    error: {
        code: string | number;
        message: string;
        details?: any;
    };

    constructor(code: string | number, message: string, details?: any) {
        this.error = { code, message, details };
    }
}