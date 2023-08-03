# SquareDev Svelte Online Payments Example

![Svelte Payments Blog Header Image](https://images.ctfassets.net/1wryd5vd9xez/6rnvU6YBixh56R2fzKKh7n/68ea06993c0397c3b565f9078fa7a42e/Accept_Payments_with_Square_and_Svelte.png?w=1920&h=527&q=100&fm=webp)

Checkout the full blog post [here](https://developer.squareup.com/blog/accept-payments-with-square-and-svelte).

## Setup

1. Make sure to install the dependencies:

```bash
npm install
```

2. In `src/routes/+page.svelte`, set `appId` and `locationId` to use your Square app and location IDs.

3. Create a `.env` file and set `VITE_SQUARE_ACCESS_TOKEN` equal to your Square access token.

## Development Server

Start the development server on http://localhost:5173/

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
