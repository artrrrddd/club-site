"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TestUploadPage() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <Card>
          <CardHeader>
            <CardTitle>Тест загрузки изображений</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Загрузите изображение</h3>
              <ImageUpload
                value={imageUrl}
                onChange={setImageUrl}
              />
            </div>

            {imageUrl && (
              <div>
                <h3 className="text-lg font-medium mb-4">Результат</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong>URL:</strong> {imageUrl}
                  </p>
                  <div className="border rounded-lg p-4">
                    <Image
                      src={imageUrl}
                      alt="Загруженное изображение"
                      width={400}
                      height={300}
                      className="max-w-full h-auto rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium mb-2">Инструкции</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Нажмите &quot;Загрузить изображение&quot; для выбора файла</li>
                <li>• Максимальный размер: 4MB</li>
                <li>• Поддерживаемые форматы: JPG, PNG, GIF</li>
                <li>• Изображение загрузится в облако UploadThing</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
