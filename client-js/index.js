'use strict';

var toolkit = require('hof-frontend-toolkit');
var helpers = toolkit.helpers;
var progressiveReveal = toolkit.progressiveReveal;
var formFocus = toolkit.formFocus;

var cookieSettings = require('./cookieSettings');

toolkit.detailsSummary();

helpers.documentReady(progressiveReveal);
helpers.documentReady(formFocus);
helpers.documentReady(cookieSettings.initialiseCookieBanner);
helpers.documentReady(cookieSettings.initialiseCookiePage);
