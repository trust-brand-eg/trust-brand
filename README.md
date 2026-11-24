# Trust Brand store

Static site (GitHub Pages, root of main) on a free Supabase project (database + auth).
No build step. Edit files and push to main.

- Storefront: index.html, product.html, cart.html, checkout.html, contact.html
- Admin: admin.html (owner login, company modules: orders, routing, stock, pricing, profit, assignment, alerts, shipping)
- Data layer: store.js (REST calls to Supabase with the public publishable key; row-level security protects data)
- Cash on delivery only. No payment gateway.

## Supabase free plan: pausing

Free projects are paused after about 1 week without activity. While paused, the shop shows the built-in catalog
but orders, sign-in and the admin do not work.

To bring it back:
1. Sign in at https://supabase.com/dashboard (owner of the project "trust-brand").
2. Open the project and click "Restore project". Wait a few minutes until the status is Healthy.
3. Reload the shop and admin. Data is kept.

To avoid pausing, open the admin page or the shop at least once a week.

## Keys

Only the publishable key is in this repo (safe by design). Never commit a secret key, a service key or a database password.
Row-level security rules and the order function live in the Supabase project (SQL editor).
Admin access is limited to the email listed in the admins table.
