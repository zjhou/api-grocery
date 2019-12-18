const {
  deletePost
} = require('../../stitch');

const { cors } = require('./utils.js');

module.exports = cors(async (req, res) => {
  const {
    user, password, id,
  } = req.body;
  const result = await deletePost({
    user, password
  })({
    id
  });
  res.json(result).end();
});
