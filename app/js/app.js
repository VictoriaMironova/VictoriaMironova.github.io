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
		$scope.list=[{name:"All Contacts", source:"./data/all.csv", type: "L"},{name: "East Coast", source: "./data/east.csv", type: "L"},{name:"United Kingdom",source:"./data/united.csv",  type: "L"}];
		$scope.contactList=[];
		$scope.event="Google Results Roadshow"
		$scope.targets.amount=0;
		$scope.OpenFullEvent=function(){
		$scope.targets=[{account:"TIAA-CREF Investment Management",
							city:"New York",
							email:"tfranks@tiaa.org",
							jobTitle:"Chief Investment Officer",
							lastMeetingDate:"2/3/2016",
							name:"Thomas Franks",
							notes:"User is requested",
							phone:"+1 212-916-4336",
							selected:false,
							shares:"72,301,586",
							sharesQtrChange:"5,841,597",
							status:"Pending",
							targetPriority:"Silver",
							value:"217.05"},
							{
								account:"Capital World Investors (U.K.)",
								city:"London",
								email:"id@capgroup.com",
								jobTitle:"Portfolio Manager",
								lastMeetingDate:"1/4/2016",
								name:"Isabelle de Wismes",
								notes:"",
								phone:"+44 20-7864-5132",
								selected:false,
								shares:"70,779,417",
								sharesQtrChange:"14,358,300",
								status:"Not Available",
								targetPriority:"Silver",
								value:"204.56"
							},{
								account:"Majedie Asset Management, LTD",
								city:"London",
								email:"richard.staveley@majedie.com",
								jobTitle:"Portfolio Manager",
								lastMeetingDate:"1/5/2016",
								name:"Richard Staveley",
								notes:"",
								phone:"+44 20-7618-3907",
								selected:false,
								shares:"67,014,971",
								sharesQtrChange:"-4,059,315",
								status:"Not Interested",
								targetPriority:"Gold",
								value:"201.18"
							}];
			$scope.event="Vodafone Interims Marketing";
		}
		$scope.OpenClearEvent=function(){
			$scope.targets=[];
			$scope.event="Google Results Roadshow";
		}
		init();
		function init() {
			contactsSrv.getData("./data/all.csv").then(function(data) {
				$scope.contactList = data;
			});
		};
	}
})();