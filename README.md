# Refaiya Maler

Static website for Refaiya, a painting, drywall, renovation, and interior finishing business in Bavaria, Germany.

## Website

Production domain:

```text
https://refaiyamaler.de
```

The site is hosted with GitHub Pages. The custom domain is configured through `CNAME`.

## Project Structure

```text
.
├── CNAME
├── LICENSE
├── README.md
├── index.html
└── assets/
    ├── refaiya-favicon.ico
    ├── refaiya-logo.png
    ├── whatsapp-icon.png
    └── descriptively-named-gallery-images.jpg
```

## Running Locally

This is a static HTML site with inline CSS and JavaScript. No build step is required.

Open `index.html` directly in a browser, or serve the folder with a small local server:

```sh
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Editing Content

- Main page markup, styles, and scripts live in `index.html`.
- Images, logo, favicon, and gallery photos live in `assets/`.
- Contact details are currently embedded directly in `index.html`.

## Deployment

This repository is deployed through GitHub Pages. Keep `index.html`, `assets/`, and `CNAME` at the repository root for the current setup.

## License

All rights reserved. See `LICENSE` for details.
