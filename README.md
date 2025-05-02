# Julio Soldevilla's Personal Website

This repository contains the source code for my personal website and blog, built with Hugo.

## Getting Started

### Prerequisites

To work with this site locally, you'll need:

- [Hugo Extended](https://gohugo.io/installation/) (latest version recommended)
- Git

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/juliosol/juliosol.github.io.git
   cd juliosol.github.io
   ```

2. Start the Hugo development server:
   ```bash
   hugo server -D
   ```

3. View your website at http://localhost:1313/

## Adding New Content

### Creating a New Blog Post

```bash
hugo new blog/YYYY-MM-DD-post-title.md
```

This will create a new Markdown file in the `content/blog` directory with the predefined template. Edit this file to write your blog post.

The frontmatter (the YAML section at the top between `---`) contains metadata about your post:

```yaml
---
title: "Your Post Title"
subtitle: "Optional subtitle"
date: YYYY-MM-DDT00:00:00Z
lastmod: YYYY-MM-DDT00:00:00Z
draft: true  # Change to false when ready to publish
author: "Julio Soldevilla"
description: "A short description of your post"
tags: ["tag1", "tag2"]
categories: ["category1"]
---
```

When you're ready to publish, change `draft: true` to `draft: false`.

### Creating a New Page

```bash
hugo new your-page-name.md
```

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch, using the GitHub Actions workflow defined in `.github/workflows/hugo.yml`.

## Customization

### Site Configuration

The main site configuration is in `hugo.yaml`. Edit this file to change site-wide settings.

### Theme Customization

This site uses a custom theme located in `themes/juliotheme`. You can modify the theme files to customize the appearance:

- `themes/juliotheme/layouts/`: HTML templates
- `themes/juliotheme/assets/css/`: CSS styles
- `themes/juliotheme/assets/js/`: JavaScript files

## License

This project is licensed under the MIT License - see the LICENSE file for details.