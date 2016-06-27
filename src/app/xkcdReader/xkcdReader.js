(function() {
    angular.module("app").directive("xkcdReader", xkcdReader);

    function xkcdReader() {
        return {
            restrict: "E",
            templateUrl: "app/xkcdReader/XkcdReader.html",
            controller: "xkcdReaderController as xrc"
        }
    }
}());