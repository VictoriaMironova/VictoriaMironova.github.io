/**
 * Created by Viktoriia_Mironova on 11/3/2016.
 */
(function() {
    'use strict';

    angular.module("targets", ['ngTouch', "ui.grid", "ui.grid.resizeColumns", 'ui.grid.edit', 'ui.grid.cellNav', 'ngSanitize', 'ui.select'])
        .controller("targetsList", targetsList)
        .directive('uiSelectWrap', uiSelectWrap);

    targetsList.$inject = ["uiGridConstants", '$scope'];

    function targetsList(uiGridConstants, $scope){
        var tl = this;
        tl.statuses=["All","Pending","Invited", "Not Available", "Not Interested"];
        tl.targetsPriority=["All","Gold", "Silver", "Bronze", "N/A"];
        tl.showpopup=false;
        tl.gridOptions = {
            enableFiltering: true,
            enableColumnMenus: false,
            enableGridMenu: true,
            enableColumnResizing: true,
            enableCellEditOnFocus:true,
            enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
            enableVerticalScrollbar: uiGridConstants.scrollbars.AUTO,
            excessRows:50,
            columnDefs: [{
                name: 'selected',
                displayName: '',
                cellTemplate:'<div class="ui-grid-cell-contents ui-grid-cell-checkbox">'
                +'<input type="checkbox" class="ipreo-checkbox" ng-model="row.entity.selected" id="selected-row{{row.entity.name}}"/>'
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
                name:'targetPriority',
                displayName:'Target Priority',
                enableCellEdit: true,
                editableCellTemplate: 'targets/cellwithSelect.html',
                editDropdownOptionsArray: tl.targetsPriority.slice(1, tl.targetsPriority.length),
            width:150
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
            },{
                name:'notes',
                displayName:'Notes',
                enableCellEdit: true,
                width:130
            },{
                name:'status',
                displayName:'Status',
                enableCellEdit: true,
                editableCellTemplate: 'targets/cellwithSelect.html',
                editDropdownOptionsArray: tl.statuses.slice(2, tl.statuses.length),
                width:150
            },{
                name:'addRequest',
                displayName:'',
                enableCellEdit: false,
                cellTemplate:'<div class="ui-grid-cell-contents ui-grid-cell-checkbox addRequet" >'
                +'<a ng-click="grid.appScope.vm.openPopup(row.entity);" class="addRequest-btn" ng-class="{\'ng-hide\':row.entity.status!=\'\'}"><i class="fa fa-plus"></i></a>'
                +'<a ng-click="grid.appScope.vm.openPopup(row.entity);" class="editRequest-btn" ng-class="{\'ng-hide\':row.entity.status==\'\'}"><i class="fa fa-pencil"></i></a></div>',
                width:40
            }
            ]
        };
        tl.gridOptions.onRegisterApi = function(gridApi){
            tl.gridApi = gridApi;
            tl.grid = gridApi.grid;
            tl.gridApi.grid.registerRowsProcessor(function(renderableRows) {
                var value = tl.filterValue ? tl.filterValue.toLowerCase() : "";
                var matcher = new RegExp(value);
                renderableRows.forEach(function(row) {
                    var match = false;
                    tl.gridOptions.columnDefs.forEach(function(field) {
                        var val = row.entity[field.name] ? row.entity[field.name].toString().toLowerCase() : "";
                        if (val.match(matcher)) {
                            match = true;
                        }
                    });
                    if (!match) {
                        row.visible = false;
                    }
                });
                return renderableRows;
            }, 200);
        };
        tl.openPopup=function(item){
            tl.showpopup=true;
            tl.item=item;
        }
        tl.addRequest=function(item){
            tl.showpopup=false;
            tl.item.status='Pending';
        }
        tl.onSelectStatusCallback = function (item, model){
            for(var i=0;i<tl.gridApi.grid.columns.length;i++){
                if(tl.gridApi.grid.columns[i].name=='status')
                {
                    tl.gridApi.grid.columns[i].filters[0].term=tl.statuses.selected;
                    if(tl.statuses.selected=='All'){
                        tl.gridApi.grid.columns[i].filters[0].term="";
                    }
                }
            }

        };
        tl.onSelectPriorityCallback = function (item, model){
            for(var i=0;i<tl.gridApi.grid.columns.length;i++){
                if(tl.gridApi.grid.columns[i].name=='targetPriority')
                {
                    tl.gridApi.grid.columns[i].filters[0].term=tl.targetsPriority.selected;
                    if(tl.targetsPriority.selected=='All'){
                        tl.gridApi.grid.columns[i].filters[0].term="";
                    }
                }
            }
        };
        tl.onSelectCityCallback = function (item, model){
            for(var i=0;i<tl.gridApi.grid.columns.length;i++){
                if(tl.gridApi.grid.columns[i].name=='city')
                {
                    tl.gridApi.grid.columns[i].filters[0].term=$scope.locations.selected;
                    if($scope.locations.selected=='All'){
                        tl.gridApi.grid.columns[i].filters[0].term="";
                    }
                }
            }
        };
        tl.onSelectContactCallback=function(item, model){
                item.status="";
                if ( $scope.locations.indexOf(item.city) === -1) {
                    $scope.locations.push(item.city);
                }
                $scope.targets.unshift(item);

                tl.gridOptions.data=$scope.targets;
                tl.gridApi.grid.refresh();
                $scope.contactList.selected="";

        }
        tl.filter = function() {
            tl.gridApi.grid.refresh();
        };
        tl.toggleAll=function(){
            for(var i=0;i<tl.gridOptions.data.length;i++){
                if(tl.gridApi.grid.rows[i].visible){
                    tl.gridOptions.data[i].selected=tl.selectall.value;
                }
            }
        }
        tl.setBulkPriority=function (priority){
            for(var i=0;i<tl.gridOptions.data.length;i++){
                if(tl.gridOptions.data[i].selected){
                    tl.gridOptions.data[i].targetPriority=priority.toString();
                }
            }
        }
        tl.setBulkStatus=function (status){
            for(var i=0;i<tl.gridOptions.data.length;i++){
                if(tl.gridOptions.data[i].selected){
                    tl.gridOptions.data[i].status=status.toString();
                }
            }
        }
        tl.deleteSelected= function(){
            for(var i=0;i<tl.gridOptions.data.length;i++){
                if(tl.gridOptions.data[i].selected){
                   $scope.targets.splice(i, 1);
                    i--;
                }
            }
        }
        $scope.$watch('vm.filterValue', function(newVal, oldVal) {
            tl.filter();
        });
        init();
        function init() {
            if($scope.targets.length>0){
                tl.gridOptions.data=$scope.targets;
            }
        };
    }

})();

uiSelectWrap.$inject = ['$document', 'uiGridEditConstants'];
function uiSelectWrap($document, uiGridEditConstants) {
    return function link($scope, $elm, $attr) {
        $document.on('click', docClick);

        function docClick(evt) {
            if ($(evt.target).closest('.ui-select-container').size() === 0) {
                $scope.$emit(uiGridEditConstants.events.END_CELL_EDIT);
                $document.off('click', docClick);
            }
        }
    };
}