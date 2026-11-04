# DPI Planning Center

A React and TypeScript website for a digital dentistry laboratory. Visitors browse services, collect items in a browser-side cart and prepare a quote request through WhatsApp.

This repository implements the commercial website and enquiry flow. It does not process DICOM/STL files or perform clinical image conversion in the browser.

## Explore the website

1. Open the home page and browse the service catalogue.
2. Add a service to the cart, change its quantity and reload to inspect local persistence.
3. Review the cart's WhatsApp message before sending it in WhatsApp.
4. Use the contact form to prepare an enquiry. The form opens WhatsApp rather than sending to a backend mailbox.

The interface includes theme controls, responsive navigation, service details and a review form. Newly entered reviews live in page state; they are not persisted to a shared review service.

## Run locally

Use Node.js **22.12+** and npm. This matches the Node 22 family used by the Docker build and supports the checked-in Vite 7 toolchain.

```bash
git clone https://github.com/helberjf/dental-radiology-website.git
cd dental-radiology-website
npm ci
npm run dev
```

Open the local URL printed by Vite.

```bash
npm run lint
npm test
npm run build
npm run preview
```

The existing tests check company contact helpers and WhatsApp message encoding; they are not end-to-end checkout tests. No backend credentials are needed for this frontend.

## Source guide

| Source | Responsibility |
| --- | --- |
| [src/data/company.ts](src/data/company.ts) | Company contact details and WhatsApp helpers |
| [src/data/services.ts](src/data/services.ts) | Service catalogue and initial review content |
| [src/components/Cart.tsx](src/components/Cart.tsx) | Quantities, totals, local storage and enquiry message |
| [src/pages/Contact.tsx](src/pages/Contact.tsx) | Contact form to WhatsApp handoff |
| [src/pages/Services.tsx](src/pages/Services.tsx) | Service listing and in-memory review state |
| [src/App.tsx](src/App.tsx) | Wouter routes and page composition |

The stack is React 18, TypeScript, Vite 7, Tailwind CSS, Wouter, Lucide and Sonner. Company information and prices are repository content, not a live external feed.

## Deployment

The static build is written to `dist`. The [Dockerfile](Dockerfile) builds with Node and serves the result with Nginx; [nginx.conf](nginx.conf) handles SPA routing.

```bash
docker build -t dpi-website .
docker run --rm -p 8080:80 dpi-website
```

See the existing [VPS guide](docs/deploy-vps.md), [EasyPanel guide](docs/DEPLOY_EASYPANEL.md) and [improvement backlog](docs/possiveis-melhorias.md), currently in Portuguese.

## Design tradeoffs

- **WhatsApp handoff:** avoids a checkout and order backend, but opening a message is not confirmation that an enquiry was sent or accepted.
- **Local cart:** `localStorage` preserves a visitor's selections on that browser; it does not synchronize across devices or create an authoritative order record.
- **Static catalogue:** service content is simple to review in Git, while every price or description change requires a new build/deployment.
- **Client-side reviews:** the form demonstrates interaction without a service dependency; durable publication and moderation would require a separate implementation.
