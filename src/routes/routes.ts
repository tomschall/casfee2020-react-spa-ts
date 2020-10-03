export default {
  base: '/',
  signed: {
    base: '/channel',
    dynamic: '/channel/:channel',
    general: '/channel/general',
    dashboard: '/dashboard',
    users: '/dashboard/users',
    pollings: '/dashboard/pollings',
    addUserToChannel: '/add-user-to-channel',
  },
  unsigned: {
    home: '/home',
  },
};
