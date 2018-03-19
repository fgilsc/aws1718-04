angular
    .module("UniversityListApp")
    .controller("ListCtrl", function($scope,$http) {

        function refresh(){
            $http.get("/api/v1/universities").then(function (response){
                $scope.universities = response.data;
            });
        }
        
        function getUniversity(){
            $http.get("/api/v1/universities/:name").then(function (response){
                $scope.university = response.data;
            });

        }
        
        $scope.addUniversity = function (){
            $http
                .post("/api/v1/universities/:name", $scope.newUniversity)
                .then(function (){
                    refresh();  
                });
        }
        
        refresh();
        
    });