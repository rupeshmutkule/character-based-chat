import { db } from "@/lib/db";
import { getServerSideUser } from "@/lib/getServerSideUser";
import { createCategoryValidator, } from "@/lib/validator/companion.validator";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: NextRequest) => {
    try {
        const user = await getServerSideUser()
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        const body = await req.json()
        const { name } = createCategoryValidator.parse(body);
        const existCategory = await db.category.findUnique({
            where: { name }
        })
        if (existCategory) return NextResponse.json({ message: "Category already exist" }, { status: 400 })
        const category = await db.category.create({
            data: { name }
        })
        return NextResponse.json({ category }, { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
        }
        return NextResponse.json({ message: "something went wrong" }, { status: 500 })
    }
}

