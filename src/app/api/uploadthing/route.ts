import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/lib/uploadthing";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: "eyJhcGlLZXkiOiJza19saXZlXzFiZjU5YjIzNTYwNjNiNDUxNGRlZWY2YmJiZDNiYzI4OTI2ZWEyNzZmMDBmNGZmZDNhZWZjZjY2OWUwNGI0ZTMiLCJhcHBJZCI6Inc3czhoMmR5ZDgiLCJyZWdpb25zIjpbInNlYTEiXX0=",
  },
});
