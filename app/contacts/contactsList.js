/**
 * Created by Viktoriia_Mironova on 11/3/2016.
 */
(function() {
    'use strict';

    angular.module("contacts", ['ngTouch', "ui.grid", "ui.grid.resizeColumns", 'ui.grid.moveColumns','ui.grid.edit', 'ui.grid.cellNav', 'ngSanitize', 'ui.select'])
        .controller("contactsList",contactsList);

    contactsList.$inject = ["uiGridConstants","contactsSrv", '$scope'];

    function contactsList(uiGridConstants, contactsSrv, $scope){
        var cl = this;
        cl.list=[{name:"All Contacts", source:"./data/all.csv"},{name: "East Coast", source: "./data/east.csv"},{name:"United Kingdom",source:"./data/united.csv"}];
        cl.filterValue="";
        cl.onSelectCallback = function (item, model){
            contactsSrv.getData(item.source).then(function(data) {
                cl.gridOptions.data = data;

            });
            cl.list.selected=item;
        };
        init();
        function init() {

        };

        cl.gridOptions = {
            enableFiltering: true,
            enableColumnMenus: false,
            enableGridMenu: true,
            enableColumnResizing: true,
            enableCellEditOnFocus: false,
            enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
            enableVerticalScrollbar: uiGridConstants.scrollbars.AUTO,
            columnDefs: [{
                name: 'selected',
                displayName: '',
                cellTemplate:'<div class="ui-grid-cell-contents ui-grid-cell-checkbox">'
                    +'<input type="checkbox" class="ipreo-checkbox" ng-click="vm.pullTargets()" ng-model="row.entity.selected" id="selected-row{{row.entity.name}}"/>'
                    +'<label class="ipreo-checkbox-label" for="selected-row{{row.entity.name}}"></label></div>',
                width:40,
                type: 'boolean',
                enableCellEdit: false
                /*cellTemplate: '<input type="checkbox" ng-model="row.entity.isActive">'*/
            },{
                name: 'name',
                displayName: 'Name',
            }, {
                name: 'account',
                displayName: 'Account',
                enableCellEdit: false
            }, {
                name: 'shares',
                displayName: 'Shares',
                enableCellEdit: false
            }, {
                name: 'value',
                displayName: 'Value',
                enableCellEdit: false
            }, {
                name: 'sharesQtrChange',
                displayName: 'Shares Qtr Change',
                enableCellEdit: false
            },{
                name:'lastMeetingDate',
                displayName:'Last Meeting Date',
                enableCellEdit: false
            },{
                name:'city',
                displayName:'City',
                enableCellEdit: false
            },{
                name:'phone',
                displayName:'Phone',
                enableCellEdit: false
            },{
                name:'jobTitle',
                displayName:'Job Title',
                enableCellEdit: false
            },{
                name:'email',
                displayName:'Email',
                enableCellEdit: false
            }
            ],
            data:  $scope.contactList
        };
        cl.gridOptions.onRegisterApi = function(gridApi){
            cl.gridApi = gridApi;
            cl.grid = gridApi.grid;
            cl.gridApi.grid.registerRowsProcessor(function(renderableRows) {
                var value = cl.filterValue ? cl.filterValue.toLowerCase() : "";
                var matcher = new RegExp(value);
                renderableRows.forEach(function(row) {
                    var match = false;
                    cl.gridOptions.columnDefs.forEach(function(field) {
                        var val = row.entity[field.name] ? row.entity[field.name].toString().toLowerCase() : "";
                        if (val.match(matcher)) {
                            match = true;
                        }
                    });
                    if (!match) {
                        row.visible = false;
                    }
                });
                for(var i=0;i<cl.gridOptions.data.length;i++){
                    cl.gridOptions.data[i].selected=false;

                }
                return renderableRows;
            }, 200);
        };
        cl.toggleAll=function(){

              for(var i=0;i<cl.gridOptions.data.length;i++){
                  if(cl.gridApi.grid.rows[i].visible){
                    cl.gridOptions.data[i].selected=cl.selectall.value;
                  }
                }
           }

        cl.pullTargets=function ()        {
            for(var i=0;i<cl.gridOptions.data.length;i++){
                if(cl.gridOptions.data[i].selected){
                    cl.gridOptions.data[i].status="";
                    cl.gridOptions.data[i].notes="";
                    cl.gridOptions.data[i].selected=false;
                    $scope.targets.push(cl.gridOptions.data[i]);
                    if ( $scope.locations.indexOf(cl.gridOptions.data[i].city) === -1) {
                        $scope.locations.push(cl.gridOptions.data[i].city);
                    }

                }
            }
        }
        cl.filter = function() {
            cl.gridApi.grid.refresh();
        };

        $scope.$watch('vm.filterValue', function(newVal, oldVal) {
            cl.filter();
        });
    }

})();
