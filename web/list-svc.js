// Injecting listSvc.
angular.module('todoList').factory('listSvc', listSvc);

/**
 * List service to request the API for a list of tasks.
 */
function listSvc($http) {
  /**
   * Obtains a list of tasks from the API
   * @return {Promise} To be resolved with an Array of tasks.
   */
  function get() {
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/private/tasks'
    });
  }

  return {
    get: get
  };
}
