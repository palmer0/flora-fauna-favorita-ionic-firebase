import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'flora-fauna-favorita-ionic-firebase',
  webDir: 'www',
  server: {
    hostname: '127.0.0.1',
    cleartext: true,
    allowNavigation: ['*']
  }
};

export default config;
