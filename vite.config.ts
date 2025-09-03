import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/ts/index.ts',
      name: 'Main',
      fileName: () => 'index.js',
      formats: ['es'],
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
      },
    },
  },
});
