const { stitchSDKAdapter } = require('./adapter/');
const StitchSDK = require('../../stitch/stitch_sdk');
const zBlogStitchConfig = require('./config');

const stitchSDK = new StitchSDK(zBlogStitchConfig);

const BlogAPI = stitchSDKAdapter(stitchSDK);

module.exports = BlogAPI;
