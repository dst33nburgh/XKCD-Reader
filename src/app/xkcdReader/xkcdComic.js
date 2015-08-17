(function() {
    angular.module("app").directive("xkcdComic", ["$rootScope", "xkcdComicService", xkcdComic]);

    function xkcdComic($rootScope, xkcdComicService) {
        return {
            restrict: "E",
            replace: false,
            scope: {
                comicNumber: "="
            },
            template: "<img ng-src='{{imgHref}}' ng-show='!loading'><img id='loading' ng-show='loading' ng-src='resources/images/loading.gif'>",
            link: function (scope) {
                $rootScope.$watch(function() { return scope.comicNumber; }, function(newVal) {
                    if (!!newVal) {
                        console.log("directive getting comic " + newVal);
                        scope.loading = true;
                        xkcdComicService.getComicAsync(newVal).then(function(comicData) {
                            scope.imgHref = comicData.img;
                        }).finally(function() {
                            scope.loading = false;
                        });
                    }
                });
            }
        };
    }
}());

