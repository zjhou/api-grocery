class Post {
  constructor(rawData) {
    return {
      id: rawData.id,
      content: rawData.content,
      title: rawData.title,
      attachment_url: rawData.attachment_url,
    }
  }
}

module.exports = {
  Post,
};