# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Setup

1. Create a `.env` file in the root of the project.
2. Add the following environment variables to the `.env` file:

   ```dotenv
   VITE_ANICHI_API_URL="https://anichi-api.vercel.app/sserver"
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Access the environment variables in your React components using `import.meta.env.VITE_ANICHI_API_URL`.
