"use client";

import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing-helpers";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import Image from "next/image";
import { X, Upload, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]) {
        // Используем ufsUrl вместо url для новой версии UploadThing
        const imageUrl = res[0].ufsUrl || res[0].url;
        onChange(imageUrl);
      }
      setIsUploading(false);
    },
    onUploadError: (error: Error) => {
      console.error("Upload error:", error);
      setIsUploading(false);
    },
  });

  const handleUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsUploading(true);
        await startUpload([file]);
      }
    };
    input.click();
  };

  const handleRemove = () => {
    onChange("");
  };

  if (value) {
    return (
      <div className="relative">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Image
              src={value}
              alt="Uploaded image"
              width={400}
              height={225}
              className="w-full aspect-video object-cover"
            />
          </CardContent>
        </Card>
        {!disabled && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className="border-2 border-dashed border-gray-300">
      <CardContent className="flex flex-col items-center justify-center py-8">
        <Upload className="h-10 w-10 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-4">
          Нажмите для загрузки изображения
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={handleUpload}
          disabled={disabled || isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Загрузка...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Загрузить изображение
            </>
          )}
        </Button>
        <p className="text-xs text-gray-500 mt-2">
          Максимум 4MB, JPG, PNG, GIF
        </p>
      </CardContent>
    </Card>
  );
}
