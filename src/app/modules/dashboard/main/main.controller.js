
module.exports = function (ngModule) {
    ngModule.controller('mainDashboardController',
        function ($scope, toastr, FileUploader, validationService) {

        //#region Properties

        let uploader = $scope.uploader = new FileUploader();

        //#endregion

        //#region Methods

        $scope.init = function () {
            toastr.success('Main dashboard has been initiated.');
        };

        //#endregion

        //#region Events

        uploader.onAfterAddingFile = function(fileItem) {
            console.log(fileItem);
        };

        //#endregion
    });
};