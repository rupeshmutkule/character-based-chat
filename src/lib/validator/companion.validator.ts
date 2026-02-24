import { z } from "zod"


export const createCompanionValidator = z.object({
    name: z.string({ required_error: "Name Is Required" }).min(3, "Name should be greater than 3 characters"),
    avatar: z.string().optional(),
    description: z.string({ required_error: "Descriptioni Is Required" }).min(5, "Description should be greater than 10 characters"),
    category: z.string({ required_error: "Category Is Required" }),
    instruction: z.string().min(50, "Instruction should be greater than 50 characters")
})

export type createCompanionRequest = z.infer<typeof createCompanionValidator>


export const createCategoryValidator = z.object({
    name: z.string({ required_error: "Name Is Required" })
})

export type createCategoryRequest = z.infer<typeof createCategoryValidator>
