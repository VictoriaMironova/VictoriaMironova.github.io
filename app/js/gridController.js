/**
 * Created by Viktoriia_Mironova on 9/1/2016.
 */
angular.module("targetManager", ['ngTouch', "ui.grid", "ui.grid.resizeColumns", 'ui.grid.edit', 'ui.grid.cellNav']).controller("targetManager", [ "uiGridConstants", targetManager ]);

function targetManager(uiGridConstants) {
    "use strict";
    var $scope = this;

    $scope.gridOptions = {
        enableFiltering: true,
        onRegisterApi: function(gridApi){
            $scope.gridApi = gridApi;
            $scope.gridApi.grid.registerRowsProcessor( $scope.singleFilter, 200 );
        },
        enableColumnMenus: false,
        enableGridMenu: false,
        enableColumnResizing: true,
        enableCellEditOnFocus: true,
        enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
        enableVerticalScrollbar: uiGridConstants.scrollbars.AUTO,
        columnDefs: [{
            name: 'account',
            displayName: 'Account',
            headerCellTemplate: 'gridHeaderCellTemplate.html',
            enableCellEdit: false
        }, {
            name: 'contacts',
            displayName: 'Contacts',
            headerCellTemplate: 'gridHeaderCellTemplate.html',
            enableCellEdit: false
        }, {
            name: 'priority',
            displayName: 'Priority',
            headerCellTemplate: 'gridHeaderCellTemplate.html',
            enableCellEdit: false
        }, {
            name: 'status',
            displayName: 'Status',
            headerCellTemplate: 'gridHeaderCellTemplate.html',
            cellTemplate: '<div class="ui-grid-cell-contents status" ng-style="row.entity.EventTypeColorCss"><span>{{row.entity.status}}</span><i class="fa fa-plus" aria-hidden="true" ng-show="row.entity.status==\'Invited\'"></i><i class="fa fa-pencil" aria-hidden="true" ng-show="row.entity.status!=\'Invited\'"></i></div>',
            enableCellEdit: false,
            filter: {
                type: uiGridConstants.filter.SELECT,
                selectOptions: [ { value: 'Invited', label: 'Invited' }, { value: 'Not Available', label: 'Not Available' }, { value: 'Not Interested', label: 'Not Interested'}, { value: 'Requested', label: 'Requested' }]
            }
        }, {
            name: 'coverage',
            displayName: 'Coverage',
            headerCellTemplate: 'gridHeaderCellTemplate.html',
            enableCellEdit: false
        }, {
            name: 'notes',
            displayName: 'Notes',
            headerCellTemplate: 'gridHeaderCellTemplate.html',
            enableCellEdit: true
        }],
        data: [{
            account: 'Fidelity',
            contacts: 'Jeff Jefferse',
            priority: 'Gold',
            status: 'Invited',
            coverage: 'Sal',
            notes: 'Chase on friday'
        }, {
            account: 'Fidelity',
            contacts: 'Robert Robertson',
            priority: 'Silver',
            status: 'Invited',
            coverage: 'Sal',
            notes: ' '
        }, {
            account: 'Henderson',
            contacts: 'James Henderson',
            priority: 'Silver',
            status: 'Requested',
            coverage: 'Reggie',
            notes: 'He really want the...'
        }, {
            account: 'GLG',
            contacts: 'Brian Johnstone',
            priority: 'Gold',
            status: 'Confirmed',
            coverage: 'Sal',
            notes: ' '
        }, {
            account: 'Invesco',
            contacts: 'Andrew Strauss',
            priority: 'Gold',
            status: 'Not Interested',
            coverage: 'Reggie',
            notes: 'on holiday'
        }, {
            account: 'WoodFord IM',
            contacts: 'Mark Woodford',
            priority: 'Silver',
            status: 'Not Available',
            coverage: 'Sal',
            notes: 'Attending a conference'
        }, {
            account: 'Legal + Central',
            contacts: 'Henry Blofeld',
            priority: 'N/A',
            status: 'Invited',
            coverage: 'Sal',
            notes: 'Not forget key prospect for us'
        }, {
            account: 'Miton AM',
            contacts: 'James Anderson',
            priority: 'N/A',
            status: 'Requested',
            coverage: 'Sal',
            notes: 'He missed out smth'
        } ]
    };
    $scope.filter = function() {
        $scope.gridApi.grid.refresh();
    };
    $scope.singleFilter = function( renderableRows ){
        var matcher = new RegExp($scope.filterValue);
        renderableRows.forEach( function( row ) {
            var match = false;
            [ 'account', 'contacts'].forEach(function( field ){
                if ( row.entity[field].match(matcher) ){
                    match = true;
                }
            });
            if ( !match ){
                row.visible = false;
            }
        });
        return renderableRows;
    };
}