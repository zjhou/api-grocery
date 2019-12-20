const {
  deletePost
} = require('../../logic/z-blog/');

const { cors } = require('./utils.js');

module.exports = cors(async (req, res) => {
  const {
    user: username, password, id,
  } = req.body;
  const result = await deletePost({
    username, password
  })({
    id
  });
  res.json(result).end();
});
