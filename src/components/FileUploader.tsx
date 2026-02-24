"use client";

import { useState } from "react";
import axios from "axios";
import { Upload } from "lucide-react";

interface Props {
    onchange: (url: string) => void;
    endpoint?: any;
}

export default function FileUploader({ onchange }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFile = async (file: File) => {
        setError(null);
        setIsLoading(true);

        try {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                throw new Error("Please select an image file");
            }

            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                throw new Error("File size must be less than 5MB");
            }

            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.fileUrl || response.data.url) {
                const imageUrl = response.data.fileUrl || response.data.url;
                onchange(imageUrl);
                console.log("Upload complete:", imageUrl);
            } else {
                throw new Error("No file URL in response");
            }
        } catch (err: any) {
            const errorMessage = 
                err.response?.data?.message || 
                err.message || 
                "Upload failed";
            setError(errorMessage);
            console.error("Upload error:", errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <label
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:bg-neutral-100/5 transition-colors"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 text-neutral-400 mb-2" />
                    <p className="text-sm text-neutral-500">
                        {isLoading ? "Uploading..." : "Drag and drop or click to upload"}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1">
                        PNG, JPG, GIF up to 5MB
                    </p>
                </div>
                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleClick}
                    disabled={isLoading}
                />
            </label>
            {error && (
                <p className="text-sm text-rose-500 mt-2">{error}</p>
            )}
        </div>
    );
}