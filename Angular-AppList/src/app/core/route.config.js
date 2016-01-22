
angular
    .module('app')
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/applications');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
    .state('applications', {
        url: '/applications',
        views: {
            '': {
                templateUrl: 'src/app/applications/partial-applications.html',
                controller: 'applicationsController'
            }
        }

    })

    .state('history', {
        url: '/history',
        templateUrl: 'src/app/history/partial-history.html'
    });
}
