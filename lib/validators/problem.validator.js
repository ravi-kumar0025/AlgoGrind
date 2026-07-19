import { z } from "zod"

const exampleSchema = z.object({
    input: z.string().min(1, "Input is required"),
    output: z.string().min(1,"Output is required"),
    explanation: z.string().optional(),
});

const testCaseSchema = z.object({
    input: z.string().min(1, "input is required"),
    output: z.string().min(1, "Output is required"),
});

export const createProblemSchema = z.object({

    title: z.string().min(3,"Title must be least 3 characters"),

    slug: z
        .string()
        .min(1)
        .regex(/^[a-z0-9-]+$/),

    description: z.string().min(20, "Description is least 20 characters"),

    difficulty: z.enum([
        "easy",
        "medium",
        "hard",
    ]),

    tags: z.array(z.string()).min(1, "Atleast one tag is required"),

    constraints: z.string().min(1,"constraints are required"),

    examples: z.array(exampleSchema).min(1, "Atleast provide one example"),

    hints: z.array(z.string()).default([]),

    editorial: z.string().optional(),

    starterCode: z.object({
        cpp: z.string().optional(),
        java: z.string().optional(),
        python: z.string().optional(),
        javascript: z.string().optional(),
    }),

    referenceSolution: z.object({
        cpp: z.string().min(1,"C++ reference code is required"),
        java: z.string().min(1, "java reference code is required"),
        python: z.string().min(1, "python reference code is required"),
        javascript: z.string().min(1, "javascript reference code is required"),
    }),

    hiddenTestCases: z
        .array(testCaseSchema)
        .min(1, "Atleast one test case is required"),

    isPublished: z.boolean().default(false),
});


const form = useForm({
    resolver: zodResolver(createProblemSchema),

    defaultValues: {
        title: "",
        slug: "",

        description: "",
        constraints: "",

        difficulty: "easy",

        tags: [],

        examples: [
            {
                input: "",
                output: "",
                explanation: "",
            },
        ],

        hiddenTestCases: [
            {
                input: "",
                output: "",
            },
        ],

        starterCode: {
            c: "",
            cpp: "",
            java: "",
            python: "",
        },

        referenceSolution: {
            cpp: "",
            java: "",
            python: "",
            javascript: "",
        },

        hints: [""],

        editorial: "",

        isPublished: false,
    },
});