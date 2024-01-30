module.exports = {
    darkMode: "class",
    content: [
        "./src/assets/**/*.{js,vue,ts,css}",
        "./src/components/**/*.{js,vue,ts}",
        "./src/layouts/**/*.vue",
        "./src/pages/**/*.vue",
        "./src/plugins/**/*.{js,ts}",
        "./src/app.vue"
    ],
    theme: {
        extend: {
            fontFamily: {
                "inter": ["Inter", "sans-serif"],
            }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
};