const {
  createPost
} = require('../../stitch');

const { cors } = require('./utils.js');

module.exports = cors(async (req, res) => {
  const {
    user, password, title, content
  } = req.body;
  const result = await createPost({
    user, password
  })({
    title, content
  });
  res.json(result).end();
});
