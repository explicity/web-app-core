import passport from 'passport';
import { getCustomRepository } from 'typeorm';
import { Strategy as LocalStrategy } from 'passport-local';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions
} from 'passport-jwt';

import { secret } from './jwt.config';
import UserRepository from '../data/repositories/user.repository';
import cryptoHelper from '../common/utils/crypto.helper';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findByEmail(email);

        if (!user) {
          return done({ status: 401, message: 'Incorrect email.' }, null);
        }

        return (await cryptoHelper.compare(password, user.password))
          ? done(null, user)
          : done({ status: 401, message: 'Passwords do not match.' }, null);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  'register',
  new LocalStrategy(
    { passReqToCallback: true },
    async ({ body: { email } }, username, password, done) => {
      try {
        const userRepository = getCustomRepository(UserRepository);
        const userByEmail = await userRepository.findByEmail(email);

        if (userByEmail) {
          return done(
            { status: 401, message: 'Email is already taken.' },
            null
          );
        }

        return (await userRepository.findByUsername(username))
          ? done({ status: 401, message: 'Username is already taken.' }, null)
          : done(null, { email, username, password });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new JwtStrategy(options, async ({ id }, done) => {
    try {
      const userRepository = getCustomRepository(UserRepository);
      const user = await userRepository.getById(id);

      return user
        ? done(null, user)
        : done({ status: 401, message: 'Token is invalid.' }, null);
    } catch (err) {
      return done(err);
    }
  })
);
