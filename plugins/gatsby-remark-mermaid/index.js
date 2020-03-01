const path = require("path");
const puppeteer = require("puppeteer");
const visit = require("unist-util-visit");

const findMermaidNodes = markdownAST => {
  const nodes = [];

  visit(markdownAST, "code", node => {
    if (node.lang !== "mermaid") return;
    nodes.push(node);
  });

  return nodes;
};

const renderString = async (browser, text, key) => {
  const page = await browser.newPage();
  await page.goto(`file://${path.resolve(__dirname, "index.html")}`);
  await page.addScriptTag({
    path: require.resolve("mermaid/dist/mermaid.min.js")
  });

  const result = await page.evaluate(
    (text, key) => {
      const container = document.getElementById("container");
      return new Promise((resolve, reject) => {
        try {
          mermaid.initialize({
            startOnLoad: true
          });
          mermaid.mermaidAPI.render(
            `diagram-${key}`,
            text,
            svg => {
              resolve(svg);
            },
            container
          );
        } catch (e) {
          reject(e);
        }
      });
    },
    text,
    key
  );

  return result;
};

module.exports = async ({ markdownAST }, pluginOptions) => {
  const nodes = findMermaidNodes(markdownAST);
  if (nodes.length === 0) return markdownAST;

  const browser = await puppeteer.launch();
  for (let node of nodes) {
    const index = nodes.indexOf(node);
    const svg = await renderString(browser, node.value, index);

    node.type = "html";
    node.value = `<figure class="diagram">\n${svg}\n</figure>`;
  }
  await browser.close();

  return markdownAST;
};
