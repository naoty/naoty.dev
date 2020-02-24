module.exports = {
  siteMetadata: {
    title: "Naoto Kaneko",
    description: "Naoto Kaneko's homepage"
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
    }
  ]
};
