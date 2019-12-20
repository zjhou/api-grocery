const {
  createPost
} = require('../../logic/z-blog/');

const { cors } = require('./utils.js');

module.exports = cors(async (req, res) => {
  const {
    user: username, password, title, content
  } = req.body;
  const result = await createPost({
    username, password
  })({
    title, content
  });
  res.json(result).end();
});
