import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ 
    image: { 
      maxFileSize: "4MB"
    } 
  })
    .middleware(async ({ req }) => {
      // Временно убираем проверку аутентификации для тестирования
      // const session = await getServerSession(authOptions);
      // if (!session || session.user.role !== "ADMIN") {
      //   throw new Error("Unauthorized");
      // }
      return {};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata);
      console.log("file url", file.url);
      return { uploadedBy: metadata };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
