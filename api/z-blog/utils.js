const Cors = require('micro-cors');
const cors = Cors({
  allowedMethods: ['GET', 'HEAD', 'OPTION', 'POST'],
});

const preFlightReqHandler = (req, res) => { res.status(200).end(); };

const objectCompact = (obj) => {
  const retObj = Object.assign({}, obj);
  const isNullValue = val => {
    return val !== false
      && val !== 0
      && !val
  };

  for(const k in retObj) {
    if (retObj.hasOwnProperty(k) && isNullValue(retObj[k])) {
      delete retObj[k];
    }
  }

  return retObj;
};

module.exports = {
  cors: (handler) => {
    const retHandler = (req, res, ...rest) => {
      const preFlight = req.method === "OPTIONS";
      if (preFlight) {
        return preFlightReqHandler(req, res, ...rest);
      }
      return handler(req, res, ...rest);
    };

    return cors(retHandler);
  },
  objectCompact,
};
