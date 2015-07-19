(function () {

  angular.module('pokedex.controllers', [])
    .controller("PokedexController",['$scope','$rootScope','$routeParams','pokemonService',function ($scope,$rootScope,$routeParams, pokemonService){
              var type =  $routeParams.type;
              if(type){
                
                pokemonService.byType(type).then(function(data){
                     $scope.pokemons = data;

                     $rootScope.poketitle = "Pokedex | "+type;
              });
              }else{
                 pokemonService.all().then(function(data){

                     $scope.pokemons = data;
                     $rootScope.poketitle = "Pokedex";
              });
              }

             
           
    }])
    .controller('PokemonController',['$scope','$rootScope','$routeParams','pokemonService',function ($scope,$rootScope,$routeParams, pokemonService) {
          $scope.pokemon = {};
          var name = $routeParams.name;
          pokemonService.byName(name)
          .then(function(data){
            $scope.pokemon = data;
            $rootScope.poketitle = "Pokedex | "+ $scope.pokemon.name;
          });
        }])

    .controller('TabsController', ['$scope',function ($scope) {
          $scope.tab = 1;
    
           $scope.isActive = function(item) {
            return $scope.tab === item;
          };
    
          $scope.selectTab = function (tab) {
            $scope.tab = tab;
          };
        }]);


})();
