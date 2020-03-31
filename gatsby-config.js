const dayjs = require("dayjs");

module.exports = {
  siteMetadata: {
    title: "Naoto Kaneko",
    description: "Naoto Kaneko's homepage",
    url:
      process.env.NODE_ENV === "production"
        ? "https://naoty.dev"
        : "http://0.0.0.0:8000"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "contents",
        path: `${__dirname}/contents/`
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-mermaid",
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              noInlineHighlight: true
            }
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 300,
              showCaptions: true
            }
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                url
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const date = dayjs(
                  edge.node.frontmatter.time,
                  "YYYY-MM-DD:HH:mm:ssZZ"
                );
                const basename = edge.node.fileAbsolutePath.split("/").pop();
                const guid = basename.replace(".md", "");
                const url = `${site.siteMetadata.url}/posts/${guid}.html`;

                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date,
                  guid,
                  url,
                  custom_elements: [{ "content:encoded": edge.node.html }]
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___time] }
                ) {
                  edges {
                    node {
                      excerpt
                      fileAbsolutePath
                      frontmatter {
                        time
                        title
                      }
                      html
                    }
                  }
                }
              }
            `,
            output: "/posts/feed.xml",
            title: "Naoto Kaneko's posts"
          }
        ]
      }
    }
  ]
};
