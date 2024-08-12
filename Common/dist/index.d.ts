import z from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export type SignInput = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SignIn = z.infer<typeof signinInput>;
export declare const createFlashCardInput: z.ZodObject<{
    question: z.ZodString;
    answer: z.ZodString;
    public: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    question: string;
    answer: string;
    public?: boolean | undefined;
}, {
    question: string;
    answer: string;
    public?: boolean | undefined;
}>;
export type CreateFlashCardInput = z.infer<typeof createFlashCardInput>;
export declare const updateFlashCardInput: z.ZodObject<{
    question: z.ZodString;
    answer: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    question: string;
    answer: string;
    id: string;
}, {
    question: string;
    answer: string;
    id: string;
}>;
export type UpdateFlashCardInput = z.infer<typeof updateFlashCardInput>;
