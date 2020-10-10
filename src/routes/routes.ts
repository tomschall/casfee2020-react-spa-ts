export default {
  base: '/',
  notfound: '/404-not-found',
  signed: {
    base: '/channel',
    dynamic: '/channel/:channel',
    general: '/channel/general',
    dashboard: '/dashboard',
    users: '/dashboard/users',
    pollings: '/dashboard/pollings',
    question: '/dashboard/pollings/:question',
    addUserToChannel: '/add-user-to-channel',
  },
  unsigned: {
    home: '/home',
    dynamic: '/channel/:channel',
  },
};
