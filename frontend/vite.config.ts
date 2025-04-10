import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // or whatever you prefer
    // headers: {
    //   "Content-Security-Policy":
    //     "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com ; img-src 'self' data:; frame-ancestors 'none'; font-src 'self' fonts.gstatic.com data:; connect-src 'self' http://localhost:5000;",
    // },
  },
  // makesure to change the https localhost:5000 to the production server url
});
