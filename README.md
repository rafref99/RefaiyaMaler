# Refaiya Maler

German website for Refaiya Osama, Maler & Trockenbau in Peißenberg. A static two-page site with no build step, framework, external fonts, or analytics.

## Pages

- `index.html`: a four-photo hero slideshow, three featured cards, services, experience, and contact details. The four unique homepage photos also appear in the gallery.
- `galerie.html`: 36 curated photos, category filters, and an accessible image dialog.
- `assets/site.css`: shared responsive layout and styling.
- `assets/site.js`: mobile navigation, gallery filters, and image dialog behavior.
- `assets/projects/`: small (up to 720 px) and large (up to 1800 px) WebP exports. Smaller originals are not upscaled. EXIF metadata is omitted.
- `assets/projects.json`: photo selection record, descriptions, dimensions, and paths to original photos relative to the parent photo directory. This is a maintenance reference, not a runtime data source.

The homepage uses four images that also appear in the gallery. The selection covers painting, decorative finishes, drywall, shaped ceilings, lighting details, and facades. Construction-stage photographs are described as work in progress. Original source photos outside this website directory remain untouched. Only images used by the website are retained in `assets/`.

## Local preview

From this directory:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/` and `http://127.0.0.1:8000/galerie.html`.

The pages also work directly from disk. Without JavaScript, all gallery photos and navigation remain available; image links open their large exports directly.

## Maintenance

Edit text directly in the two HTML files. Shared navigation, contact details, and footers must be updated on both pages. Update image titles, captions, alternative text, and `data-description` together. The JSON file records the current selection and should also be kept in sync.

To add a photograph, export small and large WebP copies, then copy a `figure.project` block in `galerie.html`. Update its category, text, image paths, dimensions, and `srcset` widths. Update the static total in the gallery intro, counter, and homepage gallery link. The JavaScript calculates filtered counts from the actual cards.

Keyboard controls: Tab to any image and Enter to open; Left/Right arrows change photos; Escape closes the dialog and returns focus to the opening image. The dialog follows the currently selected gallery category.

## Verification

Check both pages at desktop and mobile widths, menu open/close, all category filters, lightbox navigation and focus return, and contact links. Run `node --check assets/site.js` for a syntax check. All image and internal link paths should resolve locally.

## Deployment

GitHub Pages serves the repository root. Publish `index.html`, `galerie.html`, and the updated `assets/` directory together. Preserve `CNAME` and the existing domain configuration. Editing locally does not publish the site.

## Ownership

Source code, branding, text, and photographs belong to Refaiya. See `LICENSE` for usage terms.

The hero slideshow crossfades every 5.5 seconds. Visitors can pause or choose an image; manual navigation and keyboard focus pause automatic rotation. Hovering, background tabs, and an open image dialog suspend rotation. Reduced-motion preferences disable autoplay and transitions.

## Photo selection and directory layout

The gallery contains 36 photos. The homepage slideshow features the renovated attic, terracotta decorative wall, sculpted reception counter, and illuminated staircase. Its first three photos also appear as featured cards. Deleted project photos have been removed from both pages and the selection record.

- Root: the two HTML pages, README, LICENSE, CNAME, and Git configuration.
- `assets/`: the active `download.png` logo, favicon, shared CSS and JavaScript, and `projects.json`.
- `assets/projects/`: the 72 WebP exports used by the gallery (small and large for each photograph).

The header logo is 96 px tall on desktop and 80 px on mobile. The accent color is `#a6061d`. Unused legacy photos, superseded logos, obsolete design notes, and macOS metadata outside `.git/` have been removed.

Gallery order keeps related views adjacent. The Dachgeschoss sequence runs from the original wood lining through the ceiling structure to the finished room and adjoining passage. Related shop, lighting, facade, drywall-stage, and stair/niche views are also kept together. The Kaminraum sequence shows the original condition, renovation, and new decorative cladding in that order, with remaining work noted.
