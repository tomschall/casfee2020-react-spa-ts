export default {
  base: '/',
  signed: {
    base: '/channel',
    dynamic: '/channel/:channel',
    general: '/channel/general',
    dashboard: '/dashboard',
    addUserToChannel: '/add-user-to-channel',
  },
  unsigned: {
    home: '/home',
  },
};
