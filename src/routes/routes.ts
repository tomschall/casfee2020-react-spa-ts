export default {
  base: '/',
  signed: {
    base: '/channel',
    dynamic: '/channel/:channel',
    general: '/channel/general',
    dashboard: '/dashboard',
  },
  unsigned: {
    home: '/home',
  },
};
