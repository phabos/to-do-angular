var toDoApp = angular.module("ToDo", ['LocalStorageModule']);

toDoApp.config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
}])


toDoApp.controller("listCtrl", function($scope, localStorageService) {
    if( localStorageService.get('items') )
        $scope.items = localStorageService.get('items');
    else
        $scope.items = [] ;

    $scope.$watch('items', function () {
        localStorageService.set('items', $scope.items);
    }, true);

    $scope.addItem = function() {
        if($scope.title)
            $scope.items.push( { 'title': $scope.title, 'done': false} );
        $scope.title = '';
    }

    $scope.clearAllItems = function() {
        $scope.items = [];
    }

    $scope.clearItem = function( item ) {
        var index = $scope.items.indexOf(item);
        $scope.items.splice(index, 1);
    }

    $scope.changeItemStatus = function ( item ) {
        if( item.done == true )
            item.done = false;
        else
            item.done = true;
    }

});