"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DeleteNewsButtonProps {
  newsId: string;
  onDelete?: () => void;
}

export function DeleteNewsButton({ newsId, onDelete }: DeleteNewsButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Удалить эту новость?")) {
      setIsDeleting(true);
      try {
        const response = await fetch(`/api/news/${newsId}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          console.log("News deleted successfully");
          if (onDelete) {
            onDelete();
          } else {
            window.location.reload();
          }
        } else {
          const errorData = await response.json();
          console.error("Delete failed:", errorData);
          alert(`Ошибка при удалении новости: ${errorData.error || "Неизвестная ошибка"}`);
        }
      } catch (error) {
        console.error("Error deleting news:", error);
        alert("Ошибка при удалении новости");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? "Удаление..." : "Удалить"}
    </Button>
  );
}
