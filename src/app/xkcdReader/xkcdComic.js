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
            templateUrl: "app/xkcdreader/XkcdComic.html",
            link: function (scope, elem) {
                scope.error = false;

                // Wait for the image itself to finish loading before displaying it
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
                                // Does not set loading to false because we now have to wait for
                                // the image itself to finish loading
                            },
                            function(error) {
                                if (error.status == 0) {
                                    // Request was cancelled
                                    return;
                                }
                                scope.imgHref = "";
                                scope.errorMsg = "Couldn't load comic. Sorry ;(";
                                scope.errorInfo = "Error " + error.status;
                                scope.loading = false;
                                scope.error = true;
                            }
                        );
                    }
                });
            }
        };
    }
}());

