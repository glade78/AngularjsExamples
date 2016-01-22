
(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    function dataservice($http,$q) {

        var service = {
            getApplications: getApplications
        };

        return service;

        function getApplications() {
            return $http.get('src/data/applications.json')
                .then(getApplicationsComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAvengers')(message);
                    $location.url('/');
                });

            function getApplicationsComplete(data, status, headers, config) {
                return data;
            }
        }

    }
})();