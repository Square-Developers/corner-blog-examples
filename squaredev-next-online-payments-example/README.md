# Accept payments with Square using Next.js App Router

![Next Payments Blog Header Image](https://images.ctfassets.net/1wryd5vd9xez/7E1YQ6mLygBvm9Tv9glBLa/653db8a0d2b952e81c5a81e89beb5b9a/Nextjs-Blog_Header_Image__2916_x_800_.png?w=1920&h=527&q=100&fm=webp)

Checkout the full blog post [here](https://developer.squareup.com/blog/accept-payments-with-square-using-next-js-app-router/).

## Setup

1. Make sure to install the dependencies:

```bash
npm install
```

2. In `src/app/page.js`, set `appId` and `locationId` to use your Square app and location IDs.

3. Use the `.env.example` file to create a `.env` file and set `SQUARE_ACCESS_TOKEN` equal to your Square access token.

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```
