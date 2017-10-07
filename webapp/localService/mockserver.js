sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";

	var oMockServer,
		_sAppModulePath = "sap/ui/demo/bulletinboard/",
		_sMetadataPath = _sAppModulePath + "localService/metadata",
		_sJsonFilesModulePath = _sAppModulePath + "localService/mockdata";

	return {
		/**
		 * Initializes the mock server.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @public
		 */

		init : function () {
			var oUriParameters = jQuery.sap.getUriParameters(),
				sJsonFilesUrl = jQuery.sap.getModulePath(_sJsonFilesModulePath),
				sMetadataUrl = jQuery.sap.getModulePath(_sMetadataPath,".xml");

			oMockServer = new MockServer({
				// rootUri : sMockServerUrl
				rootUri: "/here/goes/your/serviceUrl/"
			});

			// configure mock server with a delay of 1s
			MockServer.config({
				autoRespond : true,
				autoRespondAfter : (oUriParameters.get("serverDelay") || 1000)
			});

			oMockServer.simulate(sMetadataUrl, {
				sMockdataBaseUrl : sJsonFilesUrl,
				bGenerateMissingMockData : true
			});

			oMockServer.start();

			jQuery.sap.log.info("Running the app with mock data");
		}
	};

});