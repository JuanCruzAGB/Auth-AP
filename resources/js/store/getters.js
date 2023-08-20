export default {
  auth (state) {
    return state.auth;
  },
  env (state) {
    return state.env;
  },
  errors (state) {
    return state.errors;
  },
  /**
   * * Returns if the media is mobile.
   * @returns {boolean}
   */
  isMobile (state) {
    return state.media == 'mobile';
  },
  /**
   * * Returns if the media is desktop.
   * @returns {boolean}
   */
  isDesktop (state) {
    return state.media == 'desktop';
  },
  media (state) {
    return state.media;
  },
  url (state) {
    return state.url;
  },
};