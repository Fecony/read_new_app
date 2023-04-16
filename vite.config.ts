import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // Reference: https://github.com/vitejs/vite/issues/1096#issuecomment-729077386

  const { VITE_PORT = 5173 } = env;

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: Number(VITE_PORT),
    },
  };
});
