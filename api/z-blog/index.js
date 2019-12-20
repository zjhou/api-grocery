const {
  fetchPosts
} = require('../../logic/z-blog/');

const { cors } = require('./utils.js');

module.exports = cors(async (req, res) => {
  const posts = await fetchPosts();
  res.json(posts).end();
});
