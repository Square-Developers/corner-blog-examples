export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      script: [
        // Square Web Payments SDK
        { src: "https://sandbox.web.squarecdn.com/v1/square.js" },
      ],
    },
  },
});
