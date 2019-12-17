import { Post } from '../dto';

const {
  AnonymousCredential,
  UserPasswordCredential,
} = require('mongodb-stitch-server-sdk');

const {
  ObjectID
} = require('mongodb');


const fetchPosts = ({ db, client }) => (lastPulledAt) => {
  return new Promise((resolve, reject) => {
    client.auth.loginWithCredential(new AnonymousCredential())
      .then(() => {
        return db.collection('posts').find({
          type: 'text',
          last_modified: {
            $gt: lastPulledAt || 0
          }
        }).asArray()
      })
      .then((posts) => {
        resolve(posts.map(p => new Post(p)))
      })
      .catch(reject)
  })
};

const updatePost = ({db, client, user, password}) => ({
  id,
  title,
  content
}) => {
  const update = {
    content,
    last_modified: Date.now() * 1000,
  };

  if (title) {
    update.title = title;
  }

  return new Promise((resolve, reject) => {
    client.auth.loginWithCredential(new UserPasswordCredential(user, password))
      .then(() => {
        db.collection('posts').updateOne({
          _id: ObjectID(id)
        }, {
          $set: update,
        })
          .then(resolve)
      })
      .catch(reject)
  })
};

const createPost = ({db, client}) => (post) => {

}

module.exports = {
  fetchPosts,
  updatePost,
};
