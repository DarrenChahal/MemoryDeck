import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
})
export type SignInput = z.infer<typeof signupInput>

// -----------------------------------------------------------------------------

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    
})
export type SignIn = z.infer<typeof signinInput>

// -----------------------------------------------------------------------------

export const createFlashCardInput = z.object({
    question: z.string(),
    answer: z.string(),
    public: z.boolean().optional()
})
export type CreateFlashCardInput = z.infer<typeof createFlashCardInput>

// -----------------------------------------------------------------------------

export const updateFlashCardInput = z.object({
    question: z.string(),
    answer: z.string(),
    id: z.string()
})
export type UpdateFlashCardInput = z.infer<typeof updateFlashCardInput>
