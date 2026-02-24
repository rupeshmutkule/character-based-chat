import { db } from "@/lib/db";
import { getServerSideUser } from "@/lib/getServerSideUser";
import { createCompanionValidator } from "@/lib/validator/companion.validator";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";



export const PATCH = async (req: NextRequest, { params }: { params: { companionId: string } }) => {
    try {
        const user = await getServerSideUser()
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        const body = await req.json()
        const { name, description, category, avatar, instruction } = createCompanionValidator.parse(body)
        const existCompanion = await db.companion.findUnique({
            where: {
                id: params.companionId
            }
        })
        if (!existCompanion) return NextResponse.json({ message: "Companion not found please try later" }, { status: 404 })
        
        // Prevent users from editing public companions (only creators can edit their own)
        if (existCompanion.creatorId !== user.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        
        // Prevent editing public/default companions
        if (existCompanion.isPublic) return NextResponse.json({ message: "Cannot edit public companions" }, { status: 403 })
        
        await db.companion.update({
            where: {
                id: params.companionId
            },
            data: {
                name, description, category, avatar, instruction
            }
        })
        return NextResponse.json({ message: "success", redirectId: existCompanion.id }, { status: 200 })
    } catch (error) {
console.log(error)
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
        }
        return NextResponse.json({ message: "something went wrong" }, { status: 500 })
    }
}


export const DELETE = async (req: NextRequest, { params }: { params: { companionId: string } }) => {
    try {
        const user = await getServerSideUser()
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

        const existCompanion = await db.companion.findUnique({
            where: {
                id: params.companionId
            },
            select: {
                id: true,
                creatorId: true,
                avatar: true,
                isPublic: true,
                category: true
            }
        })

        if (!existCompanion) return NextResponse.json({ message: "Companion not found" }, { status: 404 })
        
        // Prevent deletion of public companions
        if (existCompanion.isPublic) return NextResponse.json({ message: "Cannot delete public companions" }, { status: 403 })
        
        // Verify the user is the creator of this companion
        if (existCompanion.creatorId !== user.id) {
            return NextResponse.json({ message: "Unauthorized - you can only delete your own companions" }, { status: 403 })
        }

        // Delete all related messages (cascade delete is also configured in Prisma schema)
        await db.message.deleteMany({
            where: {
                companionId: params.companionId
            }
        })

        // Delete all verifications related to this companion
        await db.verification.deleteMany({
            where: {
                companionId: params.companionId
            }
        })

        // Finally delete the companion
        await db.companion.delete({
            where: {
                id: params.companionId
            }
        })

        // Check if the category is now empty and delete it if so
        const remainingCompanionsInCategory = await db.companion.count({
            where: {
                category: existCompanion.category
            }
        })

        if (remainingCompanionsInCategory === 0) {
            try {
                await db.category.delete({
                    where: {
                        name: existCompanion.category
                    }
                })
            } catch (categoryDeleteError) {
                console.log("Failed to delete empty category:", categoryDeleteError)
            }
        }

        return NextResponse.json({ message: "Companion deleted successfully" }, { status: 200 })
    } catch (error) {
        console.log("Delete error:", error)
        return NextResponse.json({ message: "Failed to delete companion" }, { status: 500 })
    }
}