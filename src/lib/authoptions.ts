import GoogleProvider from "next-auth/providers/google"
import { AuthOptions } from "next-auth"
import { db } from "@/lib/db"

export const authOption: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                params: {
                    prompt: "select_account"
                }
            }
        }),
    ],
    callbacks: {
        async signIn({ profile }: { profile?: any }) {
            try {
                if (!profile?.email) return false

                // Check if user already exists
                const existingUser = await db.user.findUnique({
                    where: {
                        email: profile.email
                    }
                })

                // If user doesn't exist, create them
                if (!existingUser) {
                    await db.user.create({
                        data: {
                            email: profile.email,
                            name: profile.name || "User",
                            avatar: profile.image || null,
                        }
                    })
                }

                return true
            } catch (error) {
                console.error("Auth sign in error:", error)
                return false
            }
        },
        redirect() {
            return "/"
        },
        async session({ session, token }: { session: any; token: any }) {
            if (session.user) {
                // Get user ID from database
                const user = await db.user.findUnique({
                    where: {
                        email: session.user.email || ""
                    }
                })
                if (user) {
                    session.user.id = user.id
                }
            }
            return session
        }
    },

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    pages: {
        signIn: "/",
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret-key-change-in-production",
}


