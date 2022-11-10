const config = {
  local: {},

  staging: {
    Database: {
      host: "localhost",
      port: "27017",
      dbName: "Diwali",
      mongoose: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      userName: "",
      password: "",
    },
    email: {
      username: "kunaldukare777@gmail.com",
      password: "zxvpnnznyuvsfgnl",
      host: "smtp.gmail.com",
      port: 465
    },
    api_port: 2020,
  },

  production: {},
};

export const get = function (env) {
  return config[env];
};
