import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export async function POST(req: Request): Promise<Response> {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    let secureUrl = "";

    await new Promise<void>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "companion-ai/avatars" },
          (error, result) => {
            if (error || !result) {
              reject(error);
            } else {
              secureUrl = result.secure_url;
              resolve();
            }
          }
        )
        .end(buffer);
    });

    return NextResponse.json({ url: secureUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}