(function(){
angular.module('pokedex.services',[])
	.factory('pokemonService',["$http","$q","$filter","$window",function($http,$q,$filter,$window){
		var normalize = $filter('normalize');
		var localStorage = $window.localStorage;

		function all(){
			var deferred = $q.defer();


			$http.get("/pokemons.json")
			.success(function(data){
				deferred.resolve(data);
			});

			return deferred.promise;
		}

		function byName(name){
			name = normalize(name);
			var deferred = $q.defer();

			all().then(function(data){
				var results = data.filter(function(pokemon){
					return normalize(pokemon.name) === name;
				});
				if (results.length > 0){
					deferred.resolve(results[0]);
				}else{
					deferred.reject();
					$window.location.href = "/#/404/"
				}
			});
			return deferred.promise
		}
 		function byType(type){
 		type = normalize(type)
 		var deferred = $q.defer()
 		all().then(function(data){
 			var results = data.filter(function(pokemon){
 				return pokemon.type.some(function(t){
 					return normalize(t) === type;
 				});
 			});
 			return deferred.resolve(results)
 		});

      return  deferred.promise;
 }

 	function saveComment(pokemon, comment){
 			var comments = getComments(pokemon);
 			comments.unshift(comment);
 			// comments[comments.length] = comment;
 			localStorage.setItem(pokemon,JSON.stringify(comments));

 	}
 	function getComments(pokemon){
 		var comments = localStorage.getItem(pokemon);
 		if(!comments){
 			comments = [];
 		}else{
 			comments = JSON.parse(comments);
 		}
 		return comments
 	}
		return {
			all: all,
			byName: byName,
			byType:byType,
			saveComment: saveComment,
			getComments: getComments
		}
	}])
})();