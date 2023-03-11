let baseURL = "http://192.168.1.106:8081";
if (process.env.NODE_ENV == "production") {
  //生产环境
  baseURL = "http://data-center.goomaker.com";
} else {
  //本地环境
  // baseURL = "http://data-center.goomaker.com";
  baseURL = "http://192.168.1.106:8081";
}

export { baseURL };
