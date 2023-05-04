const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./hugo_stats.json'],
  safelist: [
    'fa-angle-double-down',
    'fa-angle-double-up'
  ],
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
