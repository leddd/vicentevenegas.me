# vicentevenegas.me

This repository contains the source for my personal portfolio website. It is a collection of static HTML, CSS and JavaScript files that showcase my design projects.

## Prerequisites

- [Node.js](https://nodejs.org/) with npm installed (used for managing JavaScript dependencies)

## Running locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start a local web server from the project root. Two easy options are:
   ```bash
   npx serve .           # if you have serve installed via npx
   # or
   python3 -m http.server 8080
   ```
3. Open `http://localhost:8080/` (or the port printed by the server) in your browser to view the site.

## Build and dependencies

No additional build step is required. The site uses [Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll) for smooth scrolling, which is installed via npm and loaded from the CDN in the HTML files.

