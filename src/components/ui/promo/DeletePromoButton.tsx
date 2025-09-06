"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DeletePromoButtonProps {
  promoId: string;
  onDelete?: () => void;
}

export function DeletePromoButton({ promoId, onDelete }: DeletePromoButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Удалить эту акцию?")) {
      setIsDeleting(true);
      try {
        const response = await fetch(`/api/promos/${promoId}`, {
          method: "DELETE",
        });
        
        if (response.ok) {
          console.log("Promo deleted successfully");
          if (onDelete) {
            onDelete();
          } else {
            window.location.reload();
          }
        } else {
          const errorData = await response.json();
          console.error("Delete failed:", errorData);
          alert(`Ошибка при удалении акции: ${errorData.error || "Неизвестная ошибка"}`);
        }
      } catch (error) {
        console.error("Error deleting promo:", error);
        alert("Ошибка при удалении акции");
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
