---
draft: false
date: 2023-05-16T19:58:32+02:00
image:
author: Aurora Borealis
title: Shortcode Demo
description: A complete guide to all custom shortcodes available in the Aurora theme
summary: |
  Aurora includes several custom shortcodes to enhance your content beyond standard markdown.
  This post demonstrates all available shortcodes and how to use them in your posts.
categories:
  - Professional
topics:
  - Example
  - Shortcode
---

## Blocks

### Normal

{{< block type="info" >}}
This is the same as a normal blockquote in Markdown
{{< /block >}}

### Success

{{< block type="success" >}}
This is similar to the normal block, except this one has a green border.
{{< /block >}}

### Warning

{{< block type="warning" >}}
This is a warning block, which has bold text alongside an orange border.
{{< /block >}}

### Danger

{{< block type="danger" >}}
This is a danger block, which has bold text alongside a red border.
{{< /block >}}

## Center

{{< center >}}
You can use this shortcode to center text.
{{< /center >}}

## Image

{{< image src="cairn.jpg" alt="Full-width image."  >}}

## SplitImage

{{<
  splitImage
  src1="logo.svg" alt1="First image."
  src2="logo.svg" alt2="Second image."
>}}
