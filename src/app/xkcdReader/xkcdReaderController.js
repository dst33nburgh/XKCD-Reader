(function() {
    angular.module("app").controller("xkcdReaderController", ["$scope", "$location", "xkcdComicService", xkcdReaderController]);

    function xkcdReaderController($scope, $location, xkcdComicService) {
        var vm = this;
        vm.latestComicNum;
        vm.MIN_COMIC_NUM = 1;

        // Keep vm.comicNum and the path in sync
        $scope.$watch(function() { return vm.comicNum; }, function(newVal) {
            if (!!newVal && !($location.path() === newVal) ) {
                console.log("changing path to " + newVal);
                $location.path(newVal);
            }
        });

        updateLatestComicAsync().then(function() {
            gotoLatestComic();

            // Don't bind until we know the latest comic number
            $scope.$on("$locationChangeSuccess", function(event, newVal) {
                console.log("detected path change to " + newVal);
                var comicNumString = $location.path().split("/")[1];
                if (vm.comicNum != newVal) { // If location is out of sync with comicNum, fix it. If not, don't touch it
                    if (!comicNumString) {
                        gotoLatestComic();
                    } else {
                        vm.comicNum = parseInt(comicNumString);
                    }
                }
            });
        });

        function updateLatestComicAsync() {
            console.log("updating latest comic value");
            var promise = xkcdComicService.getLatestComicAsync().then(function(comicData) {
                console.log("update latest comic done");
                console.log(comicData);
                vm.latestComicNum = comicData.num;
            });
            return promise;
        }

        function gotoLatestComic() {
            console.log("using latestComicNum " + vm.latestComicNum);
            vm.comicNum = vm.latestComicNum;
        }

        function nextComic() {
            if (!vm.comicNum || vm.comicNum >= vm.latestComicNum) {
                vm.comicNum = vm.MIN_COMIC_NUM;
            } else {
                vm.comicNum++;
            }
        }

        function prevComic() {
            if (!vm.comicNum || vm.comicNum <= vm.MIN_COMIC_NUM) {
                vm.comicNum = vm.latestComicNum;
            } else {
                vm.comicNum--;
            }
        }

        function gotoFirstComic() {
            vm.comicNum = vm.MIN_COMIC_NUM;
        }


        //////// Keybinds ////////
        var KEY_CODES = {
            "left": 37,
            "right": 39
        };

        function handleComicKeypress($event) {
            switch($event.which) {
                case KEY_CODES["left"]:
                    nextComic();
                    break;
                case KEY_CODES["right"]:
                    prevComic();
                    break;
            }
        }


        vm.gotoLatestComic = gotoLatestComic;
        vm.nextComic = nextComic;
        vm.prevComic = prevComic;
        vm.gotoFirstComic = gotoFirstComic;
        vm.handleComicKeypress = handleComicKeypress;
    }
}());