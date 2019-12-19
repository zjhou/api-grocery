const StitchSDK = require('../../stitch/stitch_sdk');
const { StitchSDKAdapter } = require('./adapter/');

const BlogApi = StitchSDKAdapter(StitchSDK);

const zBlogConfig = require('./config');
const zBlogApi = new BlogApi(zBlogConfig);

module.exports = {
  fetchPosts: zBlogApi.fetchPosts,
};
