var Todo = angular.module('myTodo', []);

function mainController($scope, $http){
  $scope.formData = {};

  // when landing on the page, get all to dos and show them
  $http.get('/api/todos/')
    .success(function(data){
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data){
      console.log('Error: ' + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createTodo = function() {
    $http.post('/api/todos/', $scope.formData)
    .success(function(data){
      $scope.formData = {};
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data){
      console.log('Error: ' + data);
    });
  };

  // delete a todo after cheking it
  $scope.deleteTodo = function(id){
    $http.delete('/api/todos/' + id)
      .success(function(data){
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
  };
}
