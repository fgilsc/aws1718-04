angular
    .module("UniversityListApp")
    .controller("ListCtrl", function($scope,$http) {
        
        $scope.addUniversity = function (){
            
            $http
                .post("/api/v1/universities/:name", $scope.newUniversity)
                .then(function (){
                    refresh();  
                });
        
        }
        
        refresh();
        
    });