(function () {

  var app = angular.module('pokedex', [
  	'ngRoute',
    'pokedex.controllers',
    'pokedex.directives',
    'pokedex.filters',
    'pokedex.services'
  ]);
  //inyeccion de dependencias
  //ng anotated para preminificacion
	app.config(['$routeProvider',function($routeProvider){
			$routeProvider
			.when("/",{
				templateUrl:"views/pokedex.html",
				controller:"PokedexController"

			})
			.when("/pokemon/:name",{
				templateUrl:"views/pokemon.html",
				controller:'PokemonController'
				
			})
			.when("/404/",{
				templateUrl:"views/404.html",
				controller:'PokemonController'
			})
			.when("/:type",{
				templateUrl:"views/pokedex.html",
				controller:'PokedexController'
			})
			.otherwise({
				redirectTo:"/"
			})
	}]);
})();
