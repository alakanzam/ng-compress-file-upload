module.exports = function (ngModule) {

    const ImageCompressor = require('image-compressor.js/dist/image-compressor.common');

    ngModule.controller('mainDashboardController',
        ($scope, toastr, FileUploader,
         $upload, $q, blockUI,
         validationService) => {

            //#region Properties

            let uploader = $scope.uploader = new FileUploader();

            //#endregion

            //#region Methods

            $scope.init = function () {
                toastr.success('Main dashboard has been initiated.');
            };

            $scope.myImage = 'https://raw.githubusercontent.com/CrackerakiUA/ui-cropper/master/screenshots/live.jpg';
            $scope.myCroppedImage = ''; // in this variable you will have dataUrl of cropped area.
            $scope.croppedImageBlob = null;

            //#endregion

            //#region Events

            uploader.onAfterAddingFile = (item) => {
                let file = item._file;

                // Block screen access.
                blockUI.start();

                let uploadImagePromise = $q((resolve, reject) => {
                    new ImageCompressor(file, {
                        quality: 0.8,
                        success(blob) {
                            $upload.upload(blob)
                                .then((uploadImageResponse) => {
                                    resolve(uploadImageResponse)
                                })
                                .catch((exception) => {
                                    reject(exception);
                                });
                        },
                        error(e) {
                            reject(e);
                        },
                    });
                });

                uploadImagePromise
                    .finally(() => {
                        blockUI.stop();
                    })

                // let data = GZip.zip(file);

                // let blob = null;
                //
                // try {
                //     blob = new Blob([data], { type: 'image/png' });
                // }
                // catch (e) {
                //     // Old browser, need to use blob builder
                //     window.BlobBuilder = window.BlobBuilder ||
                //         window.WebKitBlobBuilder ||
                //         window.MozBlobBuilder ||
                //         window.MSBlobBuilder;
                //     if (window.BlobBuilder) {
                //         let bb = new BlobBuilder();
                //         bb.append(data);
                //         blob = bb.getBlob('image/png');
                //     }
                // }


            };


            $scope.upload = () => {
                let blob = $scope.croppedImageBlob;
                $upload.upload(blob)
                    .then((uploadImageResponse) => {
                        resolve(uploadImageResponse)
                    })
                    .catch((exception) => {
                        reject(exception);
                    });
            };

            //#endregion
        });
};