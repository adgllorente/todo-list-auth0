// Injecting authSvc.
angular.module('todoList').factory('authSvc', authSvc);

/**
 * Main service to control the authentication of the user.
 */
function authSvc($location, $rootScope, auth, store) {
  /**
   * Shows an Auth0 popup to login a user. If the user is correctly
   * logged in, his profile and token returned by Auth0 is stored using
   * localStorage.
   */
  function login() {
    auth.signin({}, function(profile, token) {
      store.set('profile', profile);
      store.set('token', token);
      $rootScope.isAuth = true;
      $location.path('/');
    }, function(error) {
      console.log(error);
    });
  }

  /**
   * Removes token and profile information from localStorage and redirects to
   * the home.
   */
  function logout() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $rootScope.isAuth = false;
    $location.path('/');
  }

  /**
   * Obtains the token of the user logged in.
   * @return {string} User token.
   */
  function getToken() {
    return store.get('token');
  }

  return {
    login: login,
    logout: logout,
    getToken: getToken
  };
}
