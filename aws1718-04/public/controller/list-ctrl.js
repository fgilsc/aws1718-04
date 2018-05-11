angular
    .module("UniversityListApp")
    .controller("ListCtrl", function($scope,$http) {

        function refresh(){
            $http.get("/api/v1/universities").then(function (response){
                $scope.universities = response.data;
            });
        }
        
        $scope.getUniversity = function(name){
            $http
                .get("/api/v1/universities/"+name, name)
                .then(function (response){
                    $scope.universityObtained = response.data;
                });

        };
        
        $scope.addUniversity = function (){
            $http
                .post("/api/v1/universities", $scope.newUniversity)
                .then(function (){
                    refresh();  
                });
        };

        
        $scope.deleteUniversity = function(name){
            $http
                .delete("/api/v1/universities/"+name, name)
                .then(function (){
                    refresh();
                });
        };
        

        $scope.updateUniversity = function (name){
            $http
                .put("/api/v1/universities/"+name, $scope.newUniversity)
                .then(function (){
                    refresh();  
                });
    
        };
        
        $scope.deleteAllUniversities = function(){
            $http
                .delete("/api/v1/universities")
                .then(function (){
                    refresh();
                });

        };
        
        $scope.getUniversityData = function(name){
            $http
                .get("/api/v1/universities/"+name, name)
                .then(function (response){
                    $scope.newUniversity = response.data;
                });

        };
        
        refresh();
        
    });