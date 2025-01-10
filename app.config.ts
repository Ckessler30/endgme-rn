module.exports = {
  name: 'ENDGME',
  slug: 'endgme',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icons/icon.png',
  scheme: 'endgme',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  backgroundColor: '#282b30',
  splash: {
    image: './assets/images/icons/splash-icon.png',
    resizeMode: 'cover',
    backgroundColor: '#282b30',
  },
  ios: {
    supportsTablet: false,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/icons/icon.png',
      backgroundColor: '#282b30',
    },
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/icons/icon.png',
  },
  plugins: ['expo-router', 'expo-splash-screen', 'expo-asset'],
  experiments: {
    typedRoutes: true,
  },
  runtimeVersion: { policy: 'fingerprint' },
  extra: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
};
