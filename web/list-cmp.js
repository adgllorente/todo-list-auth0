// Injecting main component to show the list.
angular.module('todoList').component('listCmp', {
  templateUrl: 'list-tmpl.html',
  controller: listCmp,
  restrict: 'E'
});

/**
 * Main component to show a list of tasks.
 */
function listCmp($rootScope, listSvc, authSvc) {
  var ctrl = this;

  /**
   * Logs in the user when login button is clicked.
   */
  ctrl.login = function() {
    authSvc.login();
  };

  /**
   * Logs out the user when logout button is clicked.
   */
  ctrl.logout = function() {
    authSvc.logout();
  }

  /**
   * Loads a list of tasks into scope.
   */
  function _loadList() {
    listSvc.get().then(function(response) {
      ctrl.items = response.data;
    });
  }

  // Watcher to reload the list when user changes his auth status.
  $rootScope.$watch('isAuth', function() {
    $rootScope.isAuth && _loadList();
  });

  // Loads lists of tasks when component is init.
  ctrl.$onInit = _loadList;
};
