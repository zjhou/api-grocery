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

  const createPost = methodAdapter((credential, collectionName, doc) => {
    const insertFn = stitchSDK.create.bind(stitchSDK);
    return insertFn(credential, collectionName, doc)
      .then(({ insertedId: id }) => {
        return { id, ...doc }
      })
  });

  const updatePost = methodAdapter((credential, collectionName, doc) => {
    const updateFn = stitchSDK.update.bind(stitchSDK);
    return updateFn(credential, collectionName, doc)
      .then(() => {
        return doc
      })
  });

  const deletePost = methodAdapter(stitchSDK.delete.bind(stitchSDK));

  return {
    fetchPosts,
    createPost,
    updatePost,
    deletePost
  }
};

module.exports = {
  stitchSDKAdapter
};