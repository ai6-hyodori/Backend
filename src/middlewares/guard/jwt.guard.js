import jwt from 'jsonwebtoken';
import { CustomError } from '../filter';
import commonErrors from '../filter';

const jwtGuard = (req, res, next) => {
  try {
    const userToken = req.headers.authorization.split(' ')[1];
    const jwtsecret = process.env.JWTSECRET;
    const jwtDecoded = jwt.verify(userToken, jwtsecret);
    req.currentUserId = jwtDecoded.userId;

    next();
  } catch (error) {
    if (error.message === 'jwt expired') {
      console.log('유효기간 완료 토큰 입니다.');
      throw new CustomError(401, commonErrors.authenicationError);
    } else if (error.message === 'invalid token') {
      console.log('유효하지 않은 토큰입니다.');
      throw new CustomError(401, commonErrors.authenicationError);
    } else {
      console.log('유효하지 않은 토큰입니다.');
      throw new CustomError(401, commonErrors.authenicationError);
    }
  }
};

export { jwtGuard };
