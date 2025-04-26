#!/bin/bash

# Get post title from command line argument
if [ $# -eq 0 ]; then
  echo "Please provide a post title"
  exit 1
fi

# Generate filename with date and slug
TITLE=$@
SLUG=$(echo $TITLE | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g')
DATE=$(date +"%Y-%m-%d")
FILENAME="_posts/$DATE-$SLUG.md"

# Create post file with front matter
cat > $FILENAME << EOF
---
layout: post
title: "$TITLE"
date: $(date +"%Y-%m-%d %H:%M:%S %z")
categories: []
tags: []
math: true
excerpt_separator: <!--more-->
---

Brief introduction to your topic. This part will appear on the homepage as a preview.

<!--more-->

## First Section

Your content here...

EOF

echo "Created new post: $FILENAME"