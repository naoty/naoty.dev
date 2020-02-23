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
    }
  ]
};
