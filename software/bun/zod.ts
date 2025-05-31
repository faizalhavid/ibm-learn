import { z } from 'zod';

const loginValidationSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

const failRequest = {
    email: 'test',
    password: ''
};

const validRequest = {
    email: 'johnDoe@fufufafa.com',
    password: '123456'
};



try {
    //loginValidationSchema.parse(failRequest);
    loginValidationSchema.parse(validRequest);
    console.log("Validation passed!");
} catch (e) {
    if (e instanceof z.ZodError) {
        console.error("Validation failed:", e.errors);
    } else {
        throw e;
    }
}