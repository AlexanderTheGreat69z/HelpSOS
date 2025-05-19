import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#ff0000"
            }
        },
    },
    darkMode: "class",
    plugins: [],
}

export default config;