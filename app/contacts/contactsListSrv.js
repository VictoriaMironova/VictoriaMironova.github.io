/**
 * Created by Viktoriia_Mironova on 11/3/2016.
 */
(function() {

    angular
        .module("contacts")
        .factory("contactsSrv", contactsSrv);

    contactsSrv.$inject = ["$http", "$q"];

    function contactsSrv($http, $q) {
        return {
            getData: getData
        };
        function processData(allText) {
            var allTextLines = allText.split(/\r?\n/);
            var headers = allTextLines[0].split('|');
            var lines = [];

            for (var i=1; i<allTextLines.length; i++) {
                var data = allTextLines[i].split('|');
                if (data.length == headers.length) {

                    var tarr = {};
                    tarr.selected=false;
                    for (var j=0; j<headers.length; j++) {
                        tarr[headers[j]]=data[j];
                    }
                    lines.push(tarr);
                }
            }
            return lines;

        }

        function getData(source) {
            return $http
                .get(source)
                .then(function(response) {
                    return processData(response.data);
                })
                .catch(function(response) {
                    $q.reject("Error: can not retrive data from mongolab. HTTP status " + response.status)
                });
        }

    }

})();