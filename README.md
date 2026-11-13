# Maximy new website

Static site for maximy.life, served as a Cloudflare Worker (assets from `public/`).

| Page | File |
| --- | --- |
| Individuals homepage (B2C) | `public/index.html` |
| Organisations homepage (B2B) | `public/organisations/index.html` |

Shared styles in `public/css/site.css`, behaviour (rotating hero, mobile menu) in `public/js/site.js`.
Built from the Maximy B2C / B2B Homepage v2 mockups and the Maximy style guide.

## Before launch
- Remove the `noindex` meta tag from both pages.
- Fill the two "Image to come" slots on the homepage.
- Point the placeholder `#` links at real pages.
- Attach the custom domain in the Cloudflare dashboard (Worker > Settings > Domains & Routes).
