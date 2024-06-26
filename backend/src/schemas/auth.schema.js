import { z } from 'zod'

const regex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export const registerSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }),
    last_name: z.string({
        required_error: "Last name is required"
    }),
    birth_date: z.string({
        required_error: "Birth date is required"
    }),
    username: z.string({
        required_error: "Username is required"
    }),
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email"
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(8, {
        message: "Password must be at least 8 characters"
    }).refine((password) => regex.test(password), {
        message: "Password must contain at least one number, one symbol, and one uppercase letter",
    }),
    picture: z.string({
        required_error: "Picture must be a string path",
    }).optional(),
    cover_picture: z.string({
        required_error: "Cover picture must be a string path",
    }).optional(),
    tags: z.array(
        z.object({
            tag: z.string({
                required_error: "Define the name tag"
            }),
        })
    ),
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid email"
    }),
    password: z.string({
        required_error: "Password is required"
    })
})