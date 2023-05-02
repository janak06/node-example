const Auth = require("../models/auth.model");

class AuthService {
  addNewUser(obj) {
    return new Promise(async (resolve, reject) => {
      try {
        obj.email = String(obj.email).toLowerCase();
        Auth.findOne(
          {
            $or: [
              {
                email: obj.email,
              },
            ],
          },
          (err, existingUser) => {
            if (err) {
              reject(err);
              return;
            }

            if (existingUser) {
              reject({
                message: "That email is already in use.",
              });
              return;
            }

            const auth = new Auth({
              ...obj,
            });

            auth.save(async (err2, item) => {
              if (err2) {
                reject(err2);
                return;
              }

              resolve(item.toJSON());
            });
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  }

  async UserLogin(payload) {
    try {
      const { email, password } = payload;
      const user = await Auth.findOne({ email: email });
      if (user) {
        if (user && user.authenticateUser(password)) {
          return user.toAuthJSON();
        } else {
          throw Error("password is incorrect.");
        }
      } else {
        throw Error(
          "Email or password is incorrect. Please check credentials and try again."
        );
      }
    } catch (err) {
      throw err;
    }
  }
}

const authService = new AuthService();
module.exports = authService;
