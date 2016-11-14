(function() {

	angular
		.module("app")
		.config(configAppRouter)

	function configAppRouter($stateProvider, $urlRouterProvider)
	{
		$urlRouterProvider.otherwise("/");
		$stateProvider
				.state("contacts",{
					url:"/",
					templateUrl:"contacts/contactsList.html",
					controller: "contactsList",
					controllerAs:"vm",
					/*resolve:{
						data: function(tasksSrv){
							return tasksSrv.getAllTasks();
						}
					},*/
					nav: 1
				})
				.state("targets",{
					url:"/targets",
					templateUrl:"targets/targetsList.html",
					controller: "targetsList",
					controllerAs:"vm",
					nav: 2
				})
				.state("requests",{
					url:"/requests",
					templateUrl:"requests/requestsList.html",
					controller: "requestsList",
					controllerAs:"vm",
					nav: 3
				})

	}
})();