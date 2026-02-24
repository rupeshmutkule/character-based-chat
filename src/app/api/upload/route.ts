import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request): Promise<Response> {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "companion-ai/avatars" },
            (error, res) => {
              if (error || !res) reject(error);
              else resolve(res);
            }
          )
          .end(buffer);
      }
    );

    return NextResponse.json(
      { url: result.secure_url },
      { status: 200 }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
