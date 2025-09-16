
const { withNativeWind } = require('nativewind/metro');
const { getDefaultConfig } = require('expo/metro-config');
const { mergeConfig } = require('metro-config');  // if needed

// If you have other customizations, do them before applying withNativeWind

const defaultConfig = getDefaultConfig(__dirname);

const customConfig = {
  resolver: {
    // ... only put safe overrides, NOT resolveRequest
    // e.g. sourceExts, assetExts, etc.
  },
  transformer: {
    // custom transformer, if any
  },
  // any other config options
};

let config = mergeConfig(defaultConfig, customConfig);

// Now apply NativeWind
config = withNativeWind(config, {
  input: './global.css', // make sure this path is correct
});

// Export final config
module.exports = config;