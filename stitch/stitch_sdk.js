const {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential,
  UserPasswordCredential,
  StitchAppClientConfiguration
} = require('mongodb-stitch-server-sdk');

const { ObjectID } = require('mongodb');

class StitchSDK {
  constructor(config) {
    this.client = Stitch.initializeDefaultAppClient(
      config.appID,
      new StitchAppClientConfiguration.Builder().withDataDirectory('/tmp').build()
    );

    this.db = this.client.getServiceClient(
      RemoteMongoClient.factory,
      config.clusterName
    ).db(config.dbName);
    this.isAnonymous = true;
  }


  login(username, password) {
    if (!username || !password) {
      return this.client.auth.loginWithCredential(new AnonymousCredential())
    }

    if (this.isAnonymous) {
      return this.client.auth.loginWithCredential(
        new UserPasswordCredential(username, password)
      ).then(() => {
        this.isAnonymous = false;
      })
    }
    return Promise.resolve();
  }

  validate(...args) {
    return args.reduce((pre, current) => {
      return !!pre && !!current;
    });
  }

  create(credential, collectionName, doc) {
    const {
      username,
      password,
    } = credential;

    if (!this.validate(credential, collectionName, doc)) {
      return Promise.reject(new Error('parameters missing!'))
    }

    return this.login(username, password)
      .then(() => {
        return this.db.collection(collectionName).insertOne(doc)
      })
  }

  read(collectionName) {
    return this.login()
      .then(() => {
        return this.db.collection(collectionName).find()
          .asArray()
      })
      .then((docs) => {
        return docs.map(doc => ({
          id: doc._id.toString(),
          ...doc
        }))
      })
  }

  update(credential, collectionName, doc) {
    const {
      username,
      password,
    } = credential;
    if (!this.validate(credential, collectionName, doc)) {
      return Promise.reject(new Error('parameters missing!'))
    }
    const {
      id,
      ...rest
    } = doc;
    return this.login(username, password)
      .then(() => {
        return this.db.collection(collectionName).updateOne({
          _id: ObjectID(id)
        }, {
          $set: {...rest},
        })
      })
  }

  delete(credential, collectionName, doc) {
    const {
      username,
      password,
    } = credential;
    if (!this.validate(username, password, collectionName, doc.id)) {
      return Promise.reject(new Error('parameters missing!'))
    }
    return this.login(username, password)
      .then(() => this.db.collection(collectionName).deleteOne({
        _id: ObjectID(doc.id)
      }))
  }
}

module.exports = StitchSDK;