<<<<<<< HEAD

=======
import path from 'path';
>>>>>>> 37218ee941606064404ce0a43c3ce5b7bf67ba72
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
<<<<<<< HEAD
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      }
    };
});
=======
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
>>>>>>> 37218ee941606064404ce0a43c3ce5b7bf67ba72
