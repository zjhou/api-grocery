const {
  updatePost
} = require('../../logic/z-blog/');

const { cors } = require('./utils.js');

module.exports = cors(async (req, res) => {
  const {
    user: username, password, id, content
  } = req.body;
  const result = await updatePost({
    username, password
  })({
    id, content
  });
  res.json(result).end();
});
