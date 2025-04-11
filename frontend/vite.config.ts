import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // or whatever you prefer
    headers: {
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval';" +
        "style-src 'self' 'unsafe-inline' fonts.googleapis.com ;" +
        "img-src 'self' data: https://cdn-icons-png.flaticon.com https://inteximages47.blob.core.windows.net; " +
        "frame-ancestors 'none'; font-src 'self' fonts.gstatic.com data:; " +
        "connect-src 'self' https://localhost:5000 https://cineniche-intex-cdadeqcjgwgygpgy.eastus-01.azurewebsites.net;",
    },
  },
  // makesure to change the https localhost:5000 to the production server url
});
