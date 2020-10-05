'use strict';

/* eslint-env jest, browser */

const fs = require('fs');
const path = require('path');
const cookieBanner = require('../client-js/cookieBanner');

describe('ga-tag', () => {
  let bannerContainer;

  beforeEach(() => {
    bannerContainer = document.createElement('div');
    bannerContainer.id = 'global-cookie-message';
    bannerContainer.innerHTML = fs.readFileSync(path.join(__dirname, '../node_modules/hof-template-partials/views/partials/cookie-banner.html'), 'utf8');
    document.body.appendChild(bannerContainer);
  });

  afterEach(() => {
    document.body.removeChild(bannerContainer);
  });

  describe('initialiseCookieBanner', () => {

    test('it should show banner container if container and banner are both present', () => {
      cookieBanner.initialiseCookieBanner();
      expect(bannerContainer.style.display).toEqual('block');
    });

    test('it should hide fallback content if JS is enabled', () => {
      cookieBanner.initialiseCookieBanner();
      const fallbackContent = document.getElementsByClassName('js-disabled');
      for (let element of fallbackContent) {
        expect(element.style.display).toEqual('none');
      }
    });

    test('it should show interactive content if JS is enabled', () => {
      cookieBanner.initialiseCookieBanner();
      const interactiveContent = document.getElementsByClassName('js-enabled');
      for (let element of interactiveContent) {
        expect(element.style.display).toEqual('block');
      }
    });

  });

});
