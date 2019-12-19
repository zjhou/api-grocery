class Post {
  constructor(rawData) {
    return {
      id: rawData.id,
      content: rawData.content,
      title: rawData.title,
    }
  }
}

module.exports = {
  Post,
};