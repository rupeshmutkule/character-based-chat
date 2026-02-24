// This file executes once when the server starts
import { seedDefaultCompanions } from "./seedCompanions"

async function initializeApp() {
  try {
    console.log("Initializing app - seeding default companions...")
    const result = await seedDefaultCompanions()
    if (result.success) {
      console.log( result.message)
    } else {
      console.log("Seeding error:", result.error)
    }
  } catch (error) {
    console.error("Initialization error:", error)
  }
}
// Run initialization
if (typeof window === "undefined") {
  // Only run on server side
  initializeApp().catch(console.error)
}

export { initializeApp }
