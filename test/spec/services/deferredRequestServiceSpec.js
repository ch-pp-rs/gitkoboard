'use strict';

describe('Services: deferredRequestService', function () {
    var defReq, httpMock;

    beforeEach(module('gitkoboardApp'));

    beforeEach(inject(function ($httpBackend) {
        httpMock = $httpBackend;
        inject(function($injector) {
            defReq = $injector.get('deferredRequestService');
        });
    }));

    it('should add a user to the user array', function () {
        var promiseResult,
            url = 'https://api.github.com/p-m-p/jquery-box-slider';

        httpMock.expectGET(url).respond('test1');

        defReq.getJSON(url).then(function (data) {
            promiseResult = data;
        });

        httpMock.flush();
        expect(promiseResult).toBe('test1');
    });
});

