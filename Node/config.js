const config = {
  local: {},

  staging: {
    Database: {
      host: "172.10.1.3",
      port: "27017",
      dbName: "kunaldukare",
      mongoose: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      userName: "kunaldukare",
      password: "kunaldukare675",
    },
    email:{
      username:"kunaldukare777@gmail.com",
      password:"reebjahgdttjmuof",
      host:"smtp.gmail.com",
      port:465
  },
    api_port: 8080,
  },

  production: {},
};

export const get = function (env) {
  return config[env];
};
