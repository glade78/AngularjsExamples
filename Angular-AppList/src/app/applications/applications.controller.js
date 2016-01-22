(function() {
    'use strict';

    angular
        .module('app.applications')
        .controller('applicationsController', ApplicationsController);

    /* @ngInject */
    function ApplicationsController($scope,dataservice) {
        /*jshint validthis: true */

        $scope.applicationsActions = [
            "Confirm",
            "Change Owner"
        ];

        $scope.applicationsStatus = [
            "Success",
            "Pending",
            "Denied"
        ];

        $scope.applicationsCollection = [];
        $scope.applicationsSubmitted = false;
        $scope.applicationsReport = [];

        $scope.showError = false;
        $scope.errorMessage = "";

        activate();

        function activate() {
            return getApplications().then(function() {
                console.info('Activated Applications View');
            });
        }

        function resetErrorMsg(){
            $scope.showError = false;
            $scope.errorMessage = "";
        }

        function getApplications() {
            return dataservice.getApplications().then(function(data) {
                $scope.applicationsCollection = data;
                return $scope.applicationsCollection;
            });
        }

        $scope.changeAction = function(action){
            $scope.applicationsSubmitted = false;
            resetErrorMsg();
            this.application.action = action;
            if(this.application.action != $scope.applicationsActions[1]) {
                this.application.owner = '';
                this.application.reason = '';
            }
        }

        $scope.checkAction = function(){
            return (this.application.action === $scope.applicationsActions[1] );
        }

        $scope.submitForm = function(){
            //reset
            resetErrorMsg();

            if(validateForm() == true){
                $scope.applicationsReport = $scope.applicationsCollection.data;
                for(var i=0; i<$scope.applicationsCollection.data.length;i++) {
                    $scope.applicationsReport[i].id = $scope.applicationsCollection.data[i].id;
                    $scope.applicationsReport[i].status = $scope.applicationsStatus[Math.floor(Math.random()*$scope.applicationsStatus.length)];
                    $scope.applicationsReport[i].email = $scope.applicationsCollection.data[i].owner;
                    $scope.applicationsReport[i].sr = $scope.applicationsCollection.data[i].reason;
                }
                $scope.applicationsSubmitted = true;
            }else{
                $scope.errorMessage = 'Please fill all details';
                $scope.showError = true;
            }
        }

        function validateForm(){
            var isValid = false;
            for(var i=0; i<$scope.applicationsCollection.data.length;i++) {
                var act = ($scope.applicationsCollection.data[i].action === $scope.applicationsActions[1]);
                if (($scope.applicationsCollection.data[i].action === $scope.applicationsActions[1])
                    && ($scope.applicationsCollection.data[i].owner != '')
                    && ($scope.applicationsCollection.data[i].reason != '')) {
                    isValid = true;
                }else {
                    isValid = false;
                }
            }
            return isValid;
        }
    }
})();