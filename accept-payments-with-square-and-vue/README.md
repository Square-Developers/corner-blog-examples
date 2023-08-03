# SquareDev Vue Online Payments Example

![Svelte Payments Blog Header Image](https://images.ctfassets.net/1wryd5vd9xez/6ZVP3XItvgwzDt6Cie4RzF/3152129094d17db401dd002d97eca4a2/Accept_Payments_with_Square_and_Vue.png?w=1920&h=527&q=100&fm=webp)

Checkout the full blog post [here](https://developer.squareup.com/blog/accept-payments-with-square-and-vue).

## Setup

1. Make sure to install the dependencies:

```bash
npm install
```

2. In `pages/index.vue`, set `appId` and `locationId` to use your Square app and location IDs.

3. Create a `.env` file and set `SQUARE_ACCESS_TOKEN` equal to your Square access token.

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
