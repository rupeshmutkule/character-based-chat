import { seedDefaultCompanions } from "@/lib/seedCompanions"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await seedDefaultCompanions()
    
    if (result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
