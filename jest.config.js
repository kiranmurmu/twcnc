module.exports = {
  transform: {
    "\\.[jt]sx?$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/", "/lib/", "/coverage/", "/bench/"],
};
