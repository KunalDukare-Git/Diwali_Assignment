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
      username: "selfempire07@gmail.com",
      password: "enjhzyymrlsnbikl",
      host: "smtp.gmail.com",
      port: 465
    },
    api_port: 8080,
  },

  production: {},
};

export const get = function (env) {
  return config[env];
};
