import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const isNetlify = process.env.NETLIFY === 'true';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    https: isNetlify
      ? undefined
      : {
          key: fs.readFileSync(
            path.resolve(__dirname, 'cert/localhost.com-key.pem')
          ),
          cert: fs.readFileSync(
            path.resolve(__dirname, 'cert/localhost.com.pem')
          ),
        },
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});
