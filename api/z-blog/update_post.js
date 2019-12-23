const {
  updatePost
} = require('../../logic/z-blog/');

const { cors, objectCompact } = require('./utils.js');

module.exports = cors(async (req, res) => {
  const {
    user: username,
    password,
    id,
    content,
    title,
    attachment_url,
  } = req.body;
  const result = await updatePost({
    username, password
  })(objectCompact({
    id, content, title, attachment_url
  }));
  res.json(result).end();
});
