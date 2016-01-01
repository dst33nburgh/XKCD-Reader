(function() {
    angular.module("app").service("xkcdComicService", ["$http", "$q",  xkcdComicService]);

    function xkcdComicService($http, $q) {
        var vm = this;

        var pendingRequestCanceller = null;

        function getComicAsync(comicNum) {
            // If there's a pending request, cancel it
            if(!!pendingRequestCanceller) {
                pendingRequestCanceller.resolve();
            }
            pendingRequestCanceller = $q.defer();

            console.log("getComicAsync called with comic " + (!!comicNum ? comicNum : "latest"));
            if (!comicNum && comicNum !== 0) {
                comicNum = "";
            }
            var comicUrl = "http://dynamic.xkcd.com/api-0/jsonp/comic/" + comicNum + "?callback=JSON_CALLBACK";
            var promise = $http.jsonp(comicUrl, {timeout: pendingRequestCanceller.promise}).then(
                function (data) {
                    console.log("getComicAsync done for comic " + (!!comicNum ? comicNum : "latest"));
                    return data.data;
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