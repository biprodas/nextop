import { registerAs } from '@nestjs/config';
import ms from 'ms';

export default registerAs(
  'auth',
  (): Record<string, any> => ({
    jwt: {
      accessToken: {
        secretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY ?? 'unsecureKey',
        expirationTime: ms(process.env.JWT_ACCESS_TOKEN_EXPIRES ?? '1h') / 1000,
      },

      refreshToken: {
        secretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        expirationTime:
          ms(process.env.JWT_REFRESH_TOKEN_EXPIRES ?? '7d') / 1000,
      },

      subject: process.env.AUTH_JWT_SUBJECT ?? 'bold-desert',
      audience: process.env.AUTH_JWT_AUDIENCE,
      issuer: process.env.AUTH_JWT_ISSUER,
      prefixAuthorization: 'Bearer',
    },

    password: {
      attempt: true,
      maxAttempt: 5,
      saltLength: 8,
      expiredIn: ms('90d') / 1000,
    },

    google: {
      clientId: process.env.SSO_GOOGLE_CLIENT_ID,
      clientSecret: process.env.SSO_GOOGLE_CLIENT_SECRET,
    },

    apple: {
      clientId: process.env.SSO_APPLE_CLIENT_ID,
      signInClientId: process.env.SSO_APPLE_SIGN_IN_CLIENT_ID,
    },
  }),
);
