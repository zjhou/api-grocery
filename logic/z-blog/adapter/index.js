const { Post } = require('../model/');

const stitchSDKAdapter = (stitchSDK) => {
  const postsCollectionName = 'posts';

  const fetchPosts = async () => {
    const posts = await stitchSDK.read(
      postsCollectionName
    );
    return posts.map(p => new Post(p));
  };

  const methodAdapter = (sdkMethod) => {
    return (credential) => (post) => {
      return sdkMethod(credential, postsCollectionName, post);
    }
  };

  return {
    fetchPosts,
    deletePost: methodAdapter(stitchSDK.delete.bind(stitchSDK)),
    createPost: methodAdapter(stitchSDK.create.bind(stitchSDK)),
    updatePost: methodAdapter(stitchSDK.update.bind(stitchSDK))
  }
};

module.exports = {
  stitchSDKAdapter
};