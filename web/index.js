// Declaring main module
angular.module('todoList', [
  // AngularJS general modules
  'ngRoute',
  // AngularJS modules needed by Auth0
  'ngAria',
  'ngAnimate',
  // Auth0 modules
  'auth0',
  'angular-storage',
  'angular-jwt'
]).config(function(authProvider) {
    authProvider.init({
      domain: 'AUTH0_API_DOMAIN',
      clientID: 'AUTH_CLIENT_ID'
    });
  })
  .config(function($httpProvider, jwtOptionsProvider) {
    // Configuring JWT.
    // We assign to tokenGetter a function that returns the token stored. In our
    // case, this function is called authSvc.getToken();
    // We also configure the route to redirect a user when a 401 is produced.
    // We finally add localhost to the list of whiteListedDomains because
    // otherwise our request will be blocked.
    jwtOptionsProvider.config({
      tokenGetter: ['authSvc', function(authSvc) {
        return authSvc.getToken();
      }],
      unauthenticatedRedirectPath: '/',
      whiteListedDomains: ['localhost']
    });

    // Adding jwtInterceptor to add token automatically to every request.
    $httpProvider.interceptors.push('jwtInterceptor');
  })
  .run(function(authManager) {
    // Check auth on every refresh
    authManager.checkAuthOnRefresh();
    // Redirect the user to the website configured above when API returns a 401.
    authManager.redirectWhenUnauthenticated();
  });
