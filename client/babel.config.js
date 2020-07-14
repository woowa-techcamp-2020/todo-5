module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        "targets" : "> 1%, not dead",
        "useBuiltIns": "usage",
        "corejs" : "3",
        "modules": false
      }
    ]
   ];

  return {
    presets,
  };
}