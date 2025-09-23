module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      "nativewind/babel", // <-- Move nativewind here
    ],
    plugins: [
      "react-native-reanimated/plugin",
      // any other needed plugins
    ],
  };
};
