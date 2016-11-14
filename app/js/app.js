(function() {
'use strict';

	angular.module("app", [
		"ui.router",
		"contacts",
		"targets",
		"requests",
		'ui.bootstrap'
	]).controller('appCtrl', appController)
	appController.$inject = ["contactsSrv", '$scope'];
	function appController(contactsSrv, $scope) {
		$scope.targets=[];
		$scope.locations=['All'];
		$scope.contactList=[];
		$scope.targets.amount=0;
		init();
		function init() {
			contactsSrv.getData("./data/empty.csv").then(function(data) {
				$scope.contactList = data;
			});
		};
	}
})();
