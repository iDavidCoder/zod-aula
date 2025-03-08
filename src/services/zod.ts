import z from 'zod';

export const dataValidation = z.object({
    name: z.string(),
    lastname: z.string(),
    phone: z.number(),
    date: z.any()
});