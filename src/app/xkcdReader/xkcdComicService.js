(function() {
    angular.module("app").service("xkcdComicService", ["$http", xkcdComicService]);

    function xkcdComicService($http) {
        var vm = this;

        function getComicAsync(comicNum) {
            console.log("getComicAsync called with comic " + (!!comicNum ? comicNum : "latest"));
            if (!comicNum) {
                comicNum = "";
            }
            var comicUrl = "http://dynamic.xkcd.com/api-0/jsonp/comic/" + comicNum + "?callback=JSON_CALLBACK";
            var promise = $http.jsonp(comicUrl).then(
                function (data) {
                    console.log("getComicAsync done for comic " + (!!comicNum ? comicNum : "latest"));
                    return data.data;
                },
                function (error) {
                    console.error(error);
                }
            );

            return promise;
        }

        function getLatestComicAsync() {
            console.log("getLatestComicAsync called");
            return getComicAsync();
        }

        vm.getComicAsync = getComicAsync;
        vm.getLatestComicAsync = getLatestComicAsync;
    }
}());