import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { uploadImage } from "@/lib/utils";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  maxImages?: number;
}

export function ImageUpload({
  value,
  onChange,
  maxImages = 5,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setUploading(true);
        const uploadPromises = acceptedFiles.map(uploadImage);
        const uploadedUrls = await Promise.all(uploadPromises);
        onChange([...value, ...uploadedUrls]);
      } catch (error) {
        console.error("Error uploading images:", error);
        toast.error("Failed to upload images");
      } finally {
        setUploading(false);
      }
    },
    [value, onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: maxImages - value.length,
    disabled: uploading || value.length >= maxImages,
  });

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {value.map((url, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              fill
              src={url}
              alt={`Upload ${index + 1}`}
              className="rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={() =>
                removeImage(index)}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        {value.length < maxImages && (
          <div
            {...getRootProps()}
            className={`flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <div className="text-center">
              {uploading
                ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
                )
                : (
                  <>
                    <Upload className="mx-auto h-6 w-6 text-text-light" />
                    <p className="mt-2 text-sm text-text-light">
                      Drop images here or click to upload
                    </p>
                  </>
                )}
            </div>
          </div>
        )}
      </div>
      <p className="text-sm text-text-light">
        You can upload up to {maxImages} images
      </p>
    </div>
  );
}
