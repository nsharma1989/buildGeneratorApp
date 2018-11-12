angular.module('buildController', [])

	// inject the build service factory into our controller
	.controller('mainController', ['$scope','$http','Builds', function($scope, $http, Builds) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all builds and show them
		// use the service to get all the builds
		var getAllBuild = function() {
		Builds.get()
			.success(function(data) {
				$scope.builds = data;
				$scope.loading = false;
				console.log($scope.builds);
			});
		}

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createBuild = function() {

			var allBuilds = $scope.builds;
			if(allBuilds.length !== 0 && allBuilds.indexOf($scope.formData.text) !== -1 ){
					alert('This Bundle Identifier already exist');
					return;
				}

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined || $scope.formData.build != undefined) {
				$scope.loading = true;



				// call the create function from our service (returns a promise object)
				Builds.create($scope.formData)

					// if successful creation, call our get function to get all the new builds
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.builds = data; // assign our new list of builds
					});
			}
		};

		// DELETE ==================================================================
		// delete a build after checking it
		$scope.deleteBuild = function(id) {
			$scope.loading = true;

			Builds.delete(id)
				// if successful creation, call our get function to get all the new builds
				.success(function(data) {
					$scope.loading = false;
					$scope.builds = data; // assign our new list of builds
				});
		};

		// BUMP ==================================================================
		// increment a build for a bundle identifier
		$scope.bumpBuild = function(id) {
			var newBuildNumber,
			params = {
				id: id,
				newBuildNumber: ''
			};

			$scope.loading = true;

			Builds.getById(id)
				.success(function(data) {
					$scope.currentBuildId = data[0].build;

					params.newBuildNumber = $scope.currentBuildId + 1;

					// Update function for bumping the build number
					updateBuild(params);
				});
		};

		var updateBuild = function(params){
			Builds.update(params)
				// if successful creation, call our get function to get all the new builds
				.success(function(data) {
					$scope.loading = false;
					$scope.builds = data; // assign our new list of builds
				});
		};

		var init = function(){
			getAllBuild();
		};

		init();
	}]);