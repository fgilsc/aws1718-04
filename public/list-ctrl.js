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
        
<<<<<<< HEAD
        $scope.updateUniversity = function (name){
            $http
                .put("/api/v1/universities/"+name, $scope.updatedUniversity)
                .then(function (){
                    refresh();  
                });
        
            refresh();    
=======
        $scope.deleteAllUniversities = function(){
            $http
                .delete("/api/v1/universities")
                .then(function (){
                    refresh();
                });
>>>>>>> 6053621f2897954f50cb975f31968cf1786a013a
        };
        
        refresh();
        
    });