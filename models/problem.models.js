import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema(
    {
        input: {
            type: String,
            required: true,
            trim: true,
        },

        output: {
            type: String,
            required: true,
            trim: true,
        },

        explanation: {
            type: String,
            default: "",
        },
    },
    { _id: false }
);

const testCaseSchema = new mongoose.Schema(
    {
        input: {
            type: String,
            required: true,
        },

        output: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const problemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Problem title is required"],
            trim: true,
            unique: true,
            minlength: 3,
            maxlength: 200,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        description: {
            type: String,
            required: [true, "Problem description is required"],
            minlength: 20,
        },

        difficulty: {
            type: String,
            required: true,
            enum: ["easy", "medium", "hard"],
            index: true,
        },

        tags: {
            type: [String],
            required: true,
            validate: {
                validator: (tags) => tags.length > 0,
                message: "At least one tag is required",
            },
        },

        constraints: {
            type: String,
            required: true,
        },

        examples: {
            type: [exampleSchema],
            required: true,
            validate: {
                validator: (examples) => examples.length > 0,
                message: "At least one example is required",
            },
        },

        hints: {
            type: [String],
            default: [],
        },

        editorial: {
            type: String,
            default: "",
        },

        starterCode: {
            javascript: {
                type: String,
                default: "",
            },

            cpp: {
                type: String,
                default: "",
            },

            java: {
                type: String,
                default: "",
            },

            python: {
                type: String,
                default: "",
            },
        },

        referenceSolution: {
            javascript: {
                type: String,
                default: "",
                required:[true,"Javascript reference solution is required"]
            },

            cpp: {
                type: String,
                default: "",
                required: [true, "C++ reference solution is required"]
            },

            java: {
                type: String,
                default: "",
                required: [true, "Java reference solution is required"]
            },

            python: {
                type: String,
                default: "",
                required: [true, "Python reference solution is required"]
            },
        },

        hiddenTestCases: {
            type: [testCaseSchema],
            required: true,
            validate: {
                validator: (cases) => cases.length > 0,
                message: "At least one hidden test case is required",
            },
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        isPublished: {
            type: Boolean,
            default: false,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Problem =
    mongoose.models.Problem ||
    mongoose.model("Problem", problemSchema);