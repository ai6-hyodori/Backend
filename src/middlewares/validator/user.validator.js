import commonErrors, { CustomError } from '../filter';

const regEmail =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const regPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/; // 영문 숫자 포함 8 ~ 16자리
const regfullName = /^[가-힣a-zA-Z]{2,16}$/; // 영문, 한글만 2 ~ 16글자

const loginValidator = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError(400, commonErrors.inputError);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { loginValidator };

