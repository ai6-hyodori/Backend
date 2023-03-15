import jwt from 'jsonwebtoken';
import { CustomError } from '../filter';
import commonErrors from '../filter/error/commonError';

const jwtGuard = (req, res, next) => {
  try {
    const userToken = req.headers.authorization.split(' ')[1];

    if (!userToken || userToken === 'null') {
      new CustomError(401, commonErrors.authenticationError);
    }

    const jwtsecret = process.env.JWTSECRET;
    const jwtDecoded = jwt.verify(userToken, jwtsecret);
    req.currentUserId = jwtDecoded.userId;

    next();
  } catch (error) {
    throw new CustomError(401, commonErrors.authenticationError);
  }
};

export { jwtGuard };
