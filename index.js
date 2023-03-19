import { app } from './src/app';
import { logger } from './src/middlewares/logger/config/logger';

const { PORT, JWTSECRET } = process.env;

if (!PORT || !JWTSECRET) {
  logger.error('설정되지 않은 환경변수가 있습니다. env 파일을 확인해주세요.');
} else {
  app.listen(PORT, () => {
    logger.info(`${PORT}번 포트로 정상적으로 서버를 시작하였습니다. `);
  });
}