import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // If deploying to GitHub Pages under a project repo, set base to '/<REPO_NAME>/'
  // base: '/<REPO_NAME>/'
});