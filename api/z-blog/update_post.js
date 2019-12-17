const {
  updatePost
} = require('../../stitch');

const { cors } = require('./utils.js');

module.exports = cors(async (req, res) => {
  const {
    user, password, id, content
  } = req.body;
  const result = await updatePost({
    user, password
  })({
    id, content
  });
  res.json(result).end();
});
