import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    return new Promise((resolve) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "companion-ai/avatars",
          resource_type: "auto",
          quality: "auto",
        },
        (error: any, result: any) => {
          if (error) {
            console.error("Cloudinary error:", error);
            resolve(
              NextResponse.json(
                { message: `Upload failed: ${error.message}` },
                { status: 500 }
              )
            );
          } else {
            resolve(
              NextResponse.json(
                {
                  success: true,
                  url: result.secure_url,
                  fileUrl: result.secure_url,
                },
                { status: 200 }
              )
            );
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: `Upload error: ${error.message}` },
      { status: 500 }
    );
  }
};
