const passport = require("passport");
const WebAuthnStrategy = require("passport-fido2-webauthn");
const db = require("../../db/helpers/init");
const models = require("../models");

class PassportService {
  init(store) {
    // 1. configure passport to use WebAuthn Strategy
    passport.use(this.useWebauthnStrategy(store));
    // 2. passport serialise user
    passport.serializeUser(this.serializeUserFn);
    // 3. passport deserialise user
    passport.deserializeUser(this.deserializeUserFn);
  }

  useWebauthnStrategy(store) {
    return new WebAuthnStrategy(
      { store: store },
      this.verify, // needs to be fleshed out
      this.register // needs to be fleshed out
    );
  }

  // Serialise user to token
  serializeUserFn(user, done) {
    process.nextTick(() => {
      done(null, { id: user.id, email: user.email });
    });
  }

  // Deserialise user from token
  deserializeUserFn(user, done) {
    process.nextTick(() => {
      return done(null, user);
    });
  }

  // Verify callback - used when a user wants to sign in
  async verify(id, userHandle, done) {
    const transaction = await db.transaction();
    try {
      // Find public key by id
      const currentCredentials = await models.PublicKeyCredentials.findOne(
        {
          where: { external_id: id },
        },
        { transaction }
      );

      if (currentCredentials === null) {
        return done(null, false, { message: "Invalid key. " });
      }

      // Find user by publicKey's user_id
      const currentUser = await models.User.findOne(
        {
          where: { id: currentCredentials.user_id },
        },
        { transaction }
      );

      if (currentUser === null) {
        return done(null, false, { message: "No such user. " });
      }

      // Compare user.handle from db with userHandle from request
      if (Buffer.compare(currentUser.handle, userHandle) != 0) {
        return done(null, false, { message: "Handles do not match. " });
      }

      // Commit transaction
      await transaction.commit();

      // When current user is determined, invoke done() callback
      // with user record and its public key
      return done(null, currentCredentials, currentCredentials.public_key);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  // Register callback - new user wants to sign up
  async register(user, id, publicKey, done) {
    const transaction = await db.transaction();
    try {
      // Create new user using email and handle
      const newUser = await models.User.create(
        {
          email: user.name,
          handle: user.id,
        },
        { transaction }
      );

      if (newUser === null) {
        return done(null, false, { message: "Could not create user. " });
      }

      // Create new public key credentials from user.id, the passed-in id,
      // and the passed-in publicKey
      const newCredentials = await models.PublicKeyCredentials.create(
        {
          user_id: newUser.id,
          external_id: id,
          public_key: publicKey,
        },
        { transaction }
      );

      if (newCredentials === null) {
        return done(null, false, { message: "Could not create public key. " });
      }

      // If all goes well, we commit the changes from this transaction
      await transaction.commit();

      // Once complete, invoke done() callback with new user record
      return done(null, newUser);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = PassportService;
