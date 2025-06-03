# Content Explorer - Astro App

A simple Astro application that takes each file from the content folder and creates a page with it. It also displays them as a grid on the homepage.

## 🚀 Project Structure

```
/
├── public/
│   └── placeholder-image.jpg
├── src/
│   ├── components/
│   │   └── ContentCard.astro
│   ├── content/
│   │   ├── blog/
│   │   │   └── *.md files
│   │   └── config.ts
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── blog/
│   │   │   └── [slug].astro
│   │   └── index.astro
│   └── styles/
│       └── global.css
└── package.json
```

## 📝 Content Structure

Place your markdown files in the `src/content/blog/` directory. Each file will be automatically displayed on the homepage grid and will have its own dedicated page.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## 🔧 How It Works

1. The app reads all markdown files from the `src/content/blog/` directory
2. Each file is displayed as a card in a grid on the homepage
3. Clicking on a card takes you to a dedicated page for that content
4. The app automatically extracts titles and images from the markdown content
