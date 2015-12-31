(function() {
    angular.module("app").directive("xkcdComic", ["$rootScope", "xkcdComicService", xkcdComic]);

    function xkcdComic($rootScope, xkcdComicService) {
        return {
            restrict: "E",
            replace: false,
            scope: {
                comicNumber: "=",
                comicImgClick: "&"
            },
            template:   "<h2 class='center-text' ng-show='!error'>{{title}}</h2>" +
                        "<h2 class='center-text error-msg' ng-show='error'>{{errorMsg}}</h2>" +
                        "<img ng-click='comicImgClick()' ng-show='!error' xkcd-show-loader='!error && loading' class='centered-block' title='{{alt}}' ng-src='{{imgHref}}' >",
            link: function (scope, elem) {
                scope.error = false;
                elem.children().on("load", function() {
                    $rootScope.$apply(function() {scope.loading = false;});
                });

                $rootScope.$watch(function() { return scope.comicNumber; }, function(newVal) {
                    if (!!newVal || newVal === 0) {
                        console.log("directive getting comic " + newVal);
                        scope.loading = true;
                        scope.error = false;
                        xkcdComicService.getComicAsync(newVal).then(
                            function(comicData) {
                                scope.imgHref = comicData.img;
                                scope.title = comicData.safe_title;
                                scope.alt = comicData.alt;
                            },
                            function(error) {
                                scope.error = true;
                                scope.errorMsg = "Couldn't load comic. Sorry ;(";
                            }
                        );
                    }
                });
            }
        };
    }
}());

