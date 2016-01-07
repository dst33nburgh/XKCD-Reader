(function() {
    angular.module("app").directive("ngAnimateDisable", ["$animate", ngAnimateDisable]);

    function ngAnimateDisable($animate) {
        return {
            restrict: "A",
            link: function(scope, elem) {
                $animate.enabled(elem, false);
            }
        };
    }
}());