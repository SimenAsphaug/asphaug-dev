---
title: 'How I Built My Portfolio and blog site with Next.js and Tailwind'
date: '2025-04-12'
summary: 'A peek behind the scenes at how I crafted my personal site — from modern frameworks to a headless blog setup and a focus on performance.'
tags: ["Draft", "Portfolio", "Web development", "Next.js", "Blog"]
---

Building a personal site can feel like a never-ending side project — but with the right stack, it's actually a lot of fun. I finally shipped mine after iterating through ideas and designs for way too long.

Here’s how I made **simenasphaug.dev**.

---

### 🧱 The Stack

I chose tools that were fast, flexible, and let me focus on content and design without getting in my way:

- **Next.js** — App Router, server components, and the new file-based routing.
- **Tailwind CSS** — utility-first styling that makes tweaking layout a breeze.
- **TypeScript** — because I like catching bugs before shipping.
- **MDX / Markdown** — for writing blog posts in plain text.
- **Gray Matter** — for reading frontmatter from blog files.
- **Prose** from Tailwind Typography — for clean, readable post layouts.

---

### ✨ Features I Added

- **Dynamic Blog Rendering**: Each post lives as a `.md` file and is rendered with Markdown → HTML using `remark`.
- **Static Blog Index**: The `/blog` page automatically lists all blog posts — no CMS required.
- **Project Cards**: Each project is shown in a pretty card grid, built for easy scanning.
- **Responsive Design**: The whole site is mobile-friendly and clean at every screen size.
- **Dark Mode**: Always-on, because light themes hurt my eyes ☕.

---

### 🛠️ Challenges & Wins

- **Routing** with App Router is super intuitive now — something i have always struggled with!
- Writing Markdown posts and hot-reloading them locally feels *so* much better than dealing with a CMS.
- Making blog posts look *pretty* in dark mode took some fiddling, but the `prose-invert` class helped.

---

### 🔮 What’s Next?

I want to add:

- Full-text search with [FlexSearch](https://github.com/nextapps-de/flexsearch)
- AI generated podcast of my blogs?
- Some fun!

---

### 🔗 Want to See the Code?

This site is open source (or will be soon) — follow me on [GitHub](https://github.com/SimenAsphaug) for updates.

---

Let me know what you think — or if you’re building your own site and want to swap ideas!

Stay creative ✌️
