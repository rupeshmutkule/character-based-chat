import { db } from "@/lib/db";
import { getServerSideUser } from "@/lib/getServerSideUser";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


export const PATCH = async (req: NextRequest, { params }: { params: { companionId: string } }) => {
    try {
        const user = await getServerSideUser()
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        if (user.role===Role.USER) return NextResponse.json({ message: "you dont have to access this route" }, { status: 401 })
        const companion = await db.companion.findUnique({
            where: {
                id: params.companionId
            }
        })
        if (!companion) return NextResponse.json({ message: "Cmopanion Not found" }, { status: 404 })
        const verification = await db.verification.findFirst({
            where: {
                companionId: companion.id,
            }
        })

        if (verification) {
            await db.verification.delete({
                where: {
                    id: verification.id
                }
            })
        } else {
            await db.verification.create({
                data: {
                    companionId: companion.id,
                    userId: user.id
                }
            })
        }
        return NextResponse.json({}, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    }
}