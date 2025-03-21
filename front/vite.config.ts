import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    // @ts-ignore
    const env = loadEnv(mode, process.cwd(), "");
    return {
        define: {
            "process.env.SOME_KEY": JSON.stringify(env.SOME_KEY),
        },
        plugins: [react()],
    };
});
