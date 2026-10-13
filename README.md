# AUREVIO Storefront Starter

This is a responsive frontend prototype for AUREVIO®. It includes a premium homepage, category filters, sample product cards, and a working in-browser shopping bag.

IMPORTANT: This is not yet a production e-commerce system. Checkout is intentionally disabled. There is no database, secure admin, live inventory, order tracking, or payment gateway connected. Do not accept customer payments until those features are implemented and tested.

## Easiest preview
1. Extract the ZIP on your computer.
2. Open `index.html` in a browser.

## Publish a preview
1. Create a GitHub account and a new repository.
2. Upload `index.html`, `styles.css`, and `script.js` to the repository root.
3. In Vercel, import that repository and deploy it as a static frontend, or use a static host that supports plain HTML/CSS/JS.
4. Use the free platform subdomain assigned by the host. The name may vary depending on availability.

## Update sample products
Edit the `products` array near the top of `script.js`. Change the names, categories, prices and descriptions to match actual supplier products. Prices are sample placeholders and must be checked before launch.

## Production checklist
- Backend/database and secure admin login
- Product images and verified supplier information
- Server-created payment orders and server-side payment signature verification
- Stock validation and order records
- Order status/tracking page
- Shipping, privacy, terms and return/refund policies
- Test mode payments, failed payments, refunds, mobile checkout and security checks

Recommended production stack: Next.js, Supabase, Vercel, and a payment gateway such as Razorpay (subject to merchant approval). Keep all payment secrets in server-side environment variables only.
