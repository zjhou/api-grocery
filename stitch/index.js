const {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential,
  StitchAppClientConfiguration
} = require('mongodb-stitch-server-sdk');

const { Post } = require('./dto');
const { fetchPosts:fetchPostsByDB } = require('./dao');
const { updatePost: updatePostByDB } = require('./dao');
const { deletePost: deletePostByDB } = require('./dao');
const { createPost: createPostByDB } = require('./dao');

const CONFIG = require('./config');
const client = Stitch.initializeDefaultAppClient(
  CONFIG.appID,
  new StitchAppClientConfiguration.Builder().withDataDirectory('/tmp').build()
);
const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db(CONFIG.dbName);
const fetchPosts = fetchPostsByDB({ db, client });

const updatePost = ({ user, password }) => updatePostByDB({
  db,
  client,
  user,
  password
});

const deletePost = ({ user, password }) => deletePostByDB({
  db,
  client,
  user,
  password
});

const createPost = ({ user, password }) => createPostByDB({
  db,
  client,
  user,
  password
});

module.exports = {
  db,
  client,
  fetchPosts,
  updatePost,
  deletePost,
  createPost,
};
