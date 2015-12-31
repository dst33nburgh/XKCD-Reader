(function () {
    angular.module("app").directive("xkcdShowLoader", ["$rootScope", xkcdShowLoader]);

    function xkcdShowLoader($rootScope) {
        return {
            restrict: "A",
            scope: {
                showLoader: '=xkcdShowLoader'
            },
            link: function (scope, elem) {
                var loader = angular.element("<div class='loader hidden'></div>");

                elem.parent().append(loader);

                $rootScope.$watch(function () { return scope.showLoader; }, function (showLoader) {
                    if (showLoader) {
                        elem.addClass('hidden');
                        loader.removeClass('hidden');
                    } else {
                        elem.removeClass('hidden');
                        loader.addClass('hidden');
                    }
                });
            }
        };
    }
}());