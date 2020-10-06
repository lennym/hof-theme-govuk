'use strict';

/* eslint-env jest, browser */

const fs = require('fs');
const path = require('path');
const cookieSettings = require('../client-js/cookieSettings');

describe('ga-tag', () => {

  describe('initialiseCookieBanner', () => {

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

    test('it should show banner container if container and banner are both present', () => {
      cookieSettings.initialiseCookieBanner();
      expect(bannerContainer.style.display).toEqual('block');
    });

    test('it should hide fallback content if JS is enabled', () => {
      cookieSettings.initialiseCookieBanner();
      const fallbackContent = document.getElementsByClassName('js-disabled');
      for (let element of fallbackContent) {
        expect(element.style.display).toEqual('none');
      }
    });

    test('it should show interactive content if JS is enabled', () => {
      cookieSettings.initialiseCookieBanner();
      const interactiveContent = document.getElementsByClassName('js-enabled');
      for (let element of interactiveContent) {
        expect(element.style.display).toEqual('block');
      }
    });

  });

  describe('initialiseCookiePage', () => {

    let cookieSettingsContainer;

    beforeEach(() => {
      cookieSettingsContainer = document.createElement('div');
      cookieSettingsContainer.id = 'cookie-settings';

      let jsEnabled = document.createElement('div');
      jsEnabled.classList.add('js-enabled');

      let jsDisabled = document.createElement('div');
      jsDisabled.classList.add('js-disabled');

      document.body.appendChild(cookieSettingsContainer);
      cookieSettingsContainer.appendChild(jsEnabled);
      cookieSettingsContainer.appendChild(jsDisabled);
    });

    afterEach(() => {
      document.body.removeChild(cookieSettingsContainer);
    });

    test('it should hide fallback content if JS is enabled', () => {
      cookieSettings.initialiseCookiePage();
      const fallbackContent = document.getElementsByClassName('js-disabled');
      for (let element of fallbackContent) {
        expect(element.style.display).toEqual('none');
      }
    });

    test('it should show interactive content if JS is enabled', () => {
      cookieSettings.initialiseCookiePage();
      const interactiveContent = document.getElementsByClassName('js-enabled');
      for (let element of interactiveContent) {
        expect(element.style.display).toEqual('block');
      }
    });

  });

  describe('setCookiePreferences', () => {

    let GOVUK;
    let spy;

    beforeEach(() => {
      GOVUK = {
        cookie: (name, value, options) => {}
      };

      global.GOVUK = GOVUK;

      spy = jest.spyOn(GOVUK, 'cookie');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('it should pass preferences to GOVUK helper method as JSON  with 30-day TTL', () => {
      let value = { essential: true, usage: false };
      let expected = '{"essential":true,"usage":false}';
      cookieSettings.setCookiePreferences(value);
      expect(spy).toHaveBeenNthCalledWith(1, 'cookie_preferences', expected, { days: 30 });
    });

  });

});
