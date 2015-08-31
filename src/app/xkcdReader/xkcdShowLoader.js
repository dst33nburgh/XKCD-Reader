(function () {
    angular.module("app").directive("xkcdShowLoader", ["$rootScope", xkcdShowLoader]);

    function xkcdShowLoader($rootScope) {
        return {
            restrict: "A",
            scope: {
                showLoader: '=xkcdShowLoader'
            },
            link: function (scope, elem, attrs) {
                /* Note: This wasn't done by simply adding and removing the CSS class because the CSS loader
                 * uses ::before and ::after pseudo elements, which img tags don't support.*/
                var loader = angular.element("<div class='loader'></div>"),
                    container = elem.parent(),
                    img;

                $rootScope.$watch(function () { return scope.showLoader; }, function (showLoader) {
                    if (showLoader) {
                        img = elem.detach();
                        container.append(loader);
                    } else {
                        angular.element(loader).remove();
                        container.append(img);
                    }
                });
            }
        };
    };
}());