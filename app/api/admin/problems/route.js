import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { Problem } from "@/models/problem.models";
import { validateReferenceSolutions } from "@/lib/judge0.services";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        const {
            title,
            slug,
            description,
            difficulty,
            tags,
            constraints,
            examples,
            hints,
            editorial,
            starterCode,
            referenceSolution,
            hiddenTestCases,
        } = body;

        // Basic validation
        if (
            !title ||
            !slug ||
            !description ||
            !difficulty ||
            !constraints
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Missing tile or description or difficulty or constraints",
                },
                { status: 400 }
            );
        }

        if (!tags?.length) {
            return NextResponse.json(
                {
                    success: false,
                    message: "At least one tag is required",
                },
                { status: 400 }
            );
        }

        if (!examples?.length) {
            return NextResponse.json(
                {
                    success: false,
                    message: "At least one example is required",
                },
                { status: 400 }
            );
        }

        if (!hiddenTestCases?.length) {
            return NextResponse.json(
                {
                    success: false,
                    message: "At least one hidden test case is required",
                },
                { status: 400 }
            );
        }

        // Check duplicate slug
        const existingProblem = await Problem.findOne({ slug });

        if (existingProblem) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Problem slug already exists, try different name",
                },
                { status: 409 }
            );
        }

        // Validate reference solutions against Judge0
        await validateReferenceSolutions(
            referenceSolution,
            hiddenTestCases
        );

        // Create problem
        const problem = await Problem.create({
            title,
            slug,
            description,
            difficulty,
            tags,
            constraints,
            examples,
            hints,
            editorial,
            starterCode,
            referenceSolution,
            hiddenTestCases,
            createdBy,
        });

        return NextResponse.json(
            {
                success: true,
                message: "Problem created successfully",
                problem,
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Create Problem Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message || "Internal Server Error to create the problem",
            },
            { status: 500 }
        );
    }
}