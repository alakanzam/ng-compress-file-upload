module.exports = function (ngModule) {
    ngModule.service('$upload', ($http,
                                 apiUrlsConstant) => {

        return {
            upload: (blob) => {
                let fd = new FormData();
                fd.append('photo', blob);

                let fullUrl = `${apiUrlsConstant.baseUrl}/${apiUrlsConstant.fileUpload}`;

                // Add multipart/form-data to request headers.
                let options = {
                    // transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                };


                return $http.post(fullUrl, fd, options);
            }
        }
    });
};