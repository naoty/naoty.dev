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
