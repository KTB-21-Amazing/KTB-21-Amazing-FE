import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: ".", // ✅ 프로젝트 루트를 기준으로 빌드 수행
  publicDir: "public", // ✅ public 디렉토리를 명확히 지정
  build: {
    outDir: "dist", // ✅ 빌드 결과를 `dist` 폴더에 저장
    emptyOutDir: true, // ✅ 기존 빌드 파일 제거 후 새로 빌드
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ✅ `@`를 `src/`로 매핑
    },
  },
});