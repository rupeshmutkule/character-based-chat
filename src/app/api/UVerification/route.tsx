import { db } from "@/lib/db";
import { getServerSideUser } from "@/lib/getServerSideUser";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
    try {
        const user = await getServerSideUser()
        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        if (user.role !== "ADMIN") return NextResponse.json({ message: "You are not authorized to access this route." }, { status: 401 })
        const body = await req.json()
        const { verifierId } = body
        const verifier = await db.user.findUnique({
            where: {
                id: verifierId
            }
        })
        if (!verifier) return NextResponse.json({ message: "User not found" }, { status: 404 })
        if (verifier.role === "ADMIN") return NextResponse.json({ message: "Admin can't change own Role" }, { status: 400 })

        if (verifier.role === "MODERATOR") {
            await db.user.update({
                where: {
                    id: verifier.id
                },
                data: {
                    role: "USER"
                }
            })
        } else {
            await db.user.update({
                where: {
                    id: verifier.id
                },
                data: {
                    role: "MODERATOR"
                }
            })
        }

        return NextResponse.json({ message: "success" }, { status: 200 })


    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })

    }
}