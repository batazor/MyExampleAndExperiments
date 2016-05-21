import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthConstants from '../constants/AuthConstants';

export default {

  logUserIn: (profile, token) => {
    AppDispatcher.dispatcher({
      actionType: AuthConstants.LOGIN_USER,
      profile: profile,
      token: token
    });
  },

  logUserOut: () => {
    AppDispatcher.dispatcher({
      actionType: AuthConstants.LOGOUT_USER
    });
  }

}
