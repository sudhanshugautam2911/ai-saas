import { z } from "zod";

// zod is used for client side validation when we do not have a separate backend

export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "Prompt is required"
    }),
});

