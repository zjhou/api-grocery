class Post {
  constructor(post) {
    return {
      id: post._id.toString(),
      title: post.title,
      content: post.content
    }
  }
}

module.exports = {
  Post
}
