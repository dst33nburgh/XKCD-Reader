(function() {
    angular.module("app").directive("xkcdComic", ["$rootScope", "xkcdComicService", xkcdComic]);

    function xkcdComic($rootScope, xkcdComicService) {
        return {
            restrict: "E",
            replace: false,
            scope: {
                comicNumber: "="
            },
            template:   "<h2 class='center-text'>{{title}}</h2>" +
                        "<img xkcd-show-loader='loading' class='centered-block' title='{{alt}}' ng-src='{{imgHref}}' >",
            link: function (scope, elem) {
                elem.children().on("load", function() {
                    $rootScope.$apply(function() {scope.loading = false;});
                });

                $rootScope.$watch(function() { return scope.comicNumber; }, function(newVal) {
                    if (!!newVal) {
                        console.log("directive getting comic " + newVal);
                        scope.loading = true;
                        xkcdComicService.getComicAsync(newVal).then(function(comicData) {
                            scope.imgHref = comicData.img;
                            scope.title = comicData.safe_title;
                            scope.alt = comicData.alt;
                        });
                    }
                });
            }
        };
    }
}());

