(function() {
    angular.module("app").directive("xkcdComic", ["$rootScope", "xkcdComicService", xkcdComic]);

    function xkcdComic($rootScope, xkcdComicService) {
        return {
            restrict: "E",
            replace: false,
            scope: {
                comicNumber: "="
            },
            template:   "<img ng-show='!loading' class='centered-block' ng-src='{{imgHref}}' >" +
                        "<div ng-show='loading' class='loader'></div>",
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

