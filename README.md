# <img align="center" src="./assets/theme/logo.svg" alt="Aurora logo"/> Aurora

<div align="center">

***A fully responsive [Hugo](https://gohugo.io/) theme featuring a minimalist and user-friendly design,
with a focus on delivering a seamless user experience across multiple devices.***

</div>

## Features

- Minimalist design
- Fully responsive
- Card design
- Experience timeline
- Project cards
- Dark theme
- Post categories and topics
- Syntax highlighting
- PWA

## Requirements

- `Hugo` v0.111.0 (*or later*) - With `extended` feature set
- `Golang` v1.18 (*or later*)
- `Node` LTS version (*v16 or later*)

## Usage

### 1. Initialize Hugo modules

Initialize [Hugo modules](https://gohugo.io/hugo-modules/) in your repository. This will create a `go.mod` file.

```bash
hugo mod init github.com/<username>/<repo_name>
```

### 2. Import the theme as a module

In your `hugo.yaml` file's module section, add a new import for the Aurora theme:

> **Info:**
> Optionally, you can enable [deep merge](https://gohugo.io/getting-started/configuration/#merge-configuration-from-themes) to make use of the defaults

```yaml
# hugo.yaml
_merge: deep

module:
  imports:
  - path: github.com/nszilard/aurora
```

### 3. Update your modules

Finally, fetch the latest version:

```bash
hugo mod get -u github.com/nszilard/aurora
hugo mod tidy
```

### 4. Configure PurgeCSS

In order to minimize CSS files, you can use `@fullhuman/postcss-purgecss` and `postcss-cli` packages.

```bash
npm install @fullhuman/postcss-purgecss postcss-cli
```

Next you will have to configure purge-css by adding the following file at the root of your repo:

``` js
// File: postcss.config.js
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./hugo_stats.json'],
  safelist: [],
  defaultExtractor: (content) => {
    let els = JSON.parse(content).htmlElements;
    return els.tags.concat(els.classes, els.ids);
  }
});

module.exports = {
  plugins: [
    purgecss
  ]
};

```

