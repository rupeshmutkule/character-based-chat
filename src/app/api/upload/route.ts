import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

function uploadToCloudinary(buffer: Buffer) {
  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "companion-ai/avatars" },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error("Upload returned no result"));
          } else {
            resolve(result.secure_url);
          }
        }
      )
      .end(buffer);
  });
}

export async function POST(req: NextRequest) {
  let status = 200;
  let body: Record<string, string> = {};

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      status = 400;
      body = { error: "No file provided" };
    } else {
      const buffer = Buffer.from(await file.arrayBuffer());
      const url = await uploadToCloudinary(buffer);
      body = { url };
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload failed";
    console.error("Upload error:", message);
    status = 500;
    body = { error: message };
  }

  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}