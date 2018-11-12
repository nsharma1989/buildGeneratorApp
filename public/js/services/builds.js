angular.module('buildService', [])

	// each function returns a promise object 
	.factory('Builds', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/build');
			},
			create : function(buildData) {
				return $http.post('/api/build', buildData);
			},
			delete : function(id) {
				return $http.delete('/api/build/' + id);
			},
			update : function(buildData) {
				return $http.post('/api/build/update' , buildData);
			},
			getById : function(id) {
				return $http.get('/api/build/' + id);
			},
		}
	}]);