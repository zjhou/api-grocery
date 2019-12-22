const {
  updatePost
} = require('../../logic/z-blog/');

const { cors } = require('./utils.js');

module.exports = cors(async (req, res) => {
  const {
    user: username, password, id, content, title
  } = req.body;
  const result = await updatePost({
    username, password
  })({
    id, content, title
  });
  res.json(result).end();
});
