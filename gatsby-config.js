module.exports = {
  siteMetadata: {
    title: "Naoto Kaneko",
    description: "Naoto Kaneko's homepage"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/contents/posts/`
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              noInlineHighlight: true
            }
          }
        ]
      }
    }
  ]
};
