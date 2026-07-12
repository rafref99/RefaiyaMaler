# Refaiya Maler

Source code for [www.refaiyamaler.de](https://www.refaiyamaler.de), the official website of Refaiya, a painting, drywall, and renovation business based in Peißenberg, Bavaria.

This repository is maintained privately and updated as business information, services, and project photos change.

## About the website

The site is a lightweight, responsive single-page website written in German. It presents:

- services and areas of expertise;
- information about the business;
- a project gallery with an image lightbox;
- phone, email, and WhatsApp contact options; and
- a mobile-friendly navigation menu.

There is no framework, package manager, database, or build step. The HTML, CSS, and JavaScript all live in `index.html`.

## Project structure

```text
.
├── assets/       # Logo, favicon, WhatsApp icon, and project photos
├── CNAME         # Custom domain used by GitHub Pages
├── index.html    # Page content, styles, and JavaScript
├── LICENSE       # Copyright and usage terms
└── README.md     # Project documentation
```

## Run locally

The page can be opened directly in a browser. For a more accurate local preview, serve the repository with a small HTTP server:

```sh
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000). Stop the server with `Ctrl+C`.

## Routine maintenance

Most updates only require changes to `index.html` and, for photos or branding, files in `assets/`.

### Update text or business details

Edit the relevant section in `index.html`:

| Content | Location |
| --- | --- |
| Browser title and search description | `<head>` |
| Introductory text and primary actions | `#top` |
| Services | `#leistungen` |
| Business description | `#ueberuns` |
| Project photos | `#galerie` |
| Phone, email, address, and inquiry links | `#kontakt` and the header |
| Copyright year | `<footer>` |

When changing a phone number or email address, search the entire file and update every occurrence, including `tel:`, `mailto:`, and WhatsApp links.

### Add a gallery image

1. Export the image as an optimized `.jpg` or `.webp` file.
2. Give it a short, descriptive, lowercase filename using hyphens, for example `wohnzimmer-renovierung-nachher.jpg`.
3. Add the file to `assets/`.
4. Copy an existing `<figure class="thumb">` block in the `#galerie` section of `index.html`.
5. Update `data-full`, `data-title`, `src`, `alt`, and the visible caption.

The gallery counter is calculated automatically by the page script. Meaningful alternative text should describe what is visible in the photo, not just repeat its filename.

### Replace branding assets

Keep the existing paths when replacing these files so that no HTML changes are needed:

- `assets/refaiya-logo.png`
- `assets/refaiya-favicon.ico`
- `assets/whatsapp-icon.png`

## Before publishing

Preview the site locally and check:

- desktop and mobile layouts;
- navigation and gallery/lightbox behavior;
- phone, email, WhatsApp, and external links;
- spelling, contact details, and the copyright year;
- that new images load correctly and have useful alternative text; and
- that `CNAME` still contains `refaiyamaler.de`.

## Deployment

The website is served through GitHub Pages from the repository root. Changes published to the configured Pages branch become the live site; this repository currently uses `main`.

Keep `index.html`, `CNAME`, and the `assets/` directory at the repository root unless the GitHub Pages configuration is changed as well. DNS and custom-domain settings are managed outside this repository.

## Ownership and license

This is a private business website, not an open-source template. The source code, design, branding, text, logo, and photographs are the property of Refaiya and may not be reused without permission. See [LICENSE](LICENSE) for the full terms.
