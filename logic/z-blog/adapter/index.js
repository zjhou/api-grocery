const Post = require('../model/');

const StitchSDKAdapter = (StitchSDK) => class BlogApi {
  constructor(config) {
    this.config = config;
    this.stitchSDK = new StitchSDK(config)
  }

  async fetchPosts() {
    const posts = await this.stitchSDK.read(
      this.config.collections.posts
    );
    return posts.map(p => new Post(p));
  }

};

module.exports = {
  StitchSDKAdapter,
};