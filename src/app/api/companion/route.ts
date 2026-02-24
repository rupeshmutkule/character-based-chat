import { db } from "@/lib/db";
import { getServerSideUser } from "@/lib/getServerSideUser";
import { createCompanionValidator } from "@/lib/validator/companion.validator";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";



export const POST = async (req: NextRequest) => {
    try {
        const user = await getServerSideUser()
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        const body = await req.json()
        const { name, description, category, avatar ,instruction} = createCompanionValidator.parse(body);
        if (!category) return NextResponse.json({ message: "Ctegory should be provided" }, { status: 400 })
        const companion = await db.companion.create({
            data: {
                name, description, category,
                avatar: avatar || "",
                creatorId: user.id,
                instruction,
                isPublic: false // User-created companions are private by default
            }
        })
        return NextResponse.json({ message: "success", redirectId: companion.id }, { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
        }
        return NextResponse.json({ message: "something went wrong" }, { status: 500 })
    }
}