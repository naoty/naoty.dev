const visit = require("unist-util-visit");

module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, "code", node => {
    if (node.lang !== "mermaid") return;

    node.type = "html";
    node.value = `<div class="mermaid">\n${node.value}\n</div>`;
  });

  return markdownAST;
};
