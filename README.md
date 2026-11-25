# Fencing Finesse: website rebuild mockup

Mockup redesign for **Fencing Finesse** (fencing & gates, 3/39 Biscayne Way, Jandakot WA 6164, phone 0439 411 989, carmel@fencingfinesse.com).
Current site: http://fencingfinesse.com (a Duda site builder page).

Plain HTML/CSS/JS with no build step. Open `index.html` or host the folder on GitHub Pages.

## Pages

| File | Old page | Content |
|---|---|---|
| `index.html` | Home | Hero with photo collage, at-a-glance strip, the 6 products, welcome text, "Why choose us", 8-photo gallery preview with lightbox |
| `about.html` | About Us | Complete fencing solutions, our products, since 1992, our clients |
| `services.html` | Services | Colorbond & batten fencing, pool & safety, home & garden, fencing repairs |
| `team.html` | Team | Fencing repairs, our experience, we show up on time, expert advice |
| `gallery.html` | Gallery | All 36 job photos with filters (Gates / Batten fencing / Colorbond) and a lightbox |
| `contact.html` | Contact | Enquiry form (opens an email to carmel@), address, phone, email, Google map |

All text is their own wording from the live site, lightly tidied (a typo fixed: "workmanhip"). No testimonials, prices or awards were added.

## Pitch points: what's wrong with the old site and what this fixes

- **Slider filler text in the code.** (Not confirmed that visitors see it, so look before mentioning it.) The old slider shows template placeholder text ("Slide title / Write your caption here / Button") five times, and on load it's a large blank box. The new home page opens with a real headline, a call button and three of their best job photos.
- **On a computer, the phone number is part of a flat header picture.** On phones it's real text with a tap-to-call link. The new header has a real call button, and phones get a sticky "Call 0439 411 989" bar.
- **Broken social icons.** The old Share / Tweet / Share / Mail icons are generic share buttons that render as empty grey boxes and don't link to any Fencing Finesse profile. They've been removed (see "to confirm" below).
- **Gallery is hard to use.** The old gallery is 37 unlabelled "Button" thumbnails. The new one is a big photo grid with captions, filters and a swipeable full-screen viewer, since their finished jobs are the best sales tool they have.
- **Logo and tagline are a flat image.** The logo badge is kept, but the business name and "The right side of the fence" tagline are now real text (sharper, readable by Google).
- **Dated look and code.** Grey, small, low-contrast text on a paper texture. The new site keeps their green (#669900) and charcoal, with bold condensed headings that suit a trade business.
- **SEO.** Each page has its own title and description built around their keywords (batten gates Perth, batten fencing, Colorbond fencing, pool fencing, fencing repairs).
- **Free measure & quote** (mentioned only once on the old contact page) is now a call to action on every page.

### Don't say (checked 24 Nov 2026)

- "The number is cut off" or "customers can't tap it". Phones get a separate version, and all 5 pages checked have a tap-to-call link.
- "It doesn't work on phones."
- Safe points: the dated desktop look, the uncaptioned gallery, and the free quote not being on the home page.

## Polish features

- Dark mode that follows the phone/computer setting, with a sun/moon toggle in the header. The choice is remembered (localStorage, wrapped in try/catch) and set before first paint, so there's no flash. Every colour is a CSS variable.
- Sections and cards fade/slide up in a quick stagger as you scroll (IntersectionObserver).
- Smooth hover states on buttons, cards and nav links. The mobile menu and the lightbox open and close smoothly.
- Sticky header that gets a shadow and blur once you scroll. Smooth scrolling for in-page links.
- Subtle zoom on image hover, back-to-top button, lazy-loaded images, visible keyboard focus styles and a skip link.
- Lightbox: arrow keys, Esc, swipe on phones, photo counter, focus kept inside and returned afterwards.
- All motion is 150–400 ms ease-out and switches off under `prefers-reduced-motion`.
- Tested at 375px and 1280–1366px, light and dark: no horizontal scrolling on any page.

## To confirm with the owner

- **Opening hours.** None are listed on the old site, so none are shown.
- **Social media.** If they have a Facebook or Instagram page, add the link in the footer.
- **Service area.** The old site only says "throughout Perth". Worth asking which suburbs they cover.
- **Pool fencing photo.** The only pool photo on the old site is a small 281px thumbnail (`images/svc-pool.jpg`), so it's slightly soft. A bigger photo of a pool job would help.
- **Gallery captions** describe what's in each photo (e.g. "Timber-look batten double gates"). The owner may want to correct product names or colours.
- **Contact form.** There's no server, so "Send" opens the visitor's email app addressed to carmel@fencingfinesse.com. A real form service (e.g. Formspree) can be connected if they want it.
- **Privacy policy.** The old site links to one. Not rebuilt here; carry it over if needed.
- The old site's titles mention "Colorbond" a lot, but the photos are mostly aluminium batten work. Check which they want to lead with.

## Image sources

All images come from their current website's own image hosting (the Duda CDN folder for their site, `irp-cdn.multiscreensite.com/3e5b8738/.../fencingfinesse_com/...` and `irp.cdn-website.com/3e5b8738/...`). Nothing is stock.

| File(s) | Source on the old site |
|---|---|
| `logo-original.png` | Header banner image `5146ad98307100-956x140.png` |
| `logo-badge.png` | The "FF" shield cropped from that header image |
| `job-01.jpg` – `job-36.jpg` | The 36 full-size (1024×768) photos from the Gallery page, re-saved at 80% JPEG quality. Original names in order: 00250, 0050, 0070, 0080, 00820, 0090, 0100, 01020, 0110, 01130, 0130, 1.5long65mmBattenPanelswith32mmspacings10, BattenFencingSimon120, HAF0, IMG09300, IMG09790, IMG11920, IMG13010, IMG13590, IMG14220, IMG14320, IMG14380, IMG14730, IMG14980, IMG15030, IMG15340, IMG16020, IMG16060, IMG16420, IMG16590, IMG16610, Joel30, Kristy10, LaurieDavies0, Lloyd30, Stella60 |
| `svc-pool.jpg` | Services page thumbnail `PoolFencing10-281x186.jpg` |

Total image folder size: about 4.4 MB.
