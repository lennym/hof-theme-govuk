'use strict';

// TODO: update banner on selection to dismissable message confirming choice
// TODO: update cookie page on selection (use confirmation alert?) && dismiss banner

// TODO: set banner visibility based on cookie preferences
// TODO: initialise gaTag based on cookie preferences

// TODO: aria-labels

function hideFallbackContent(containerId) {
  var container = document.getElementById(containerId);
  if (container === null) return;
  var fallbackContent = container.getElementsByClassName('js-disabled');
  for (var i = 0; i < fallbackContent.length; i++) {
    fallbackContent[i].style.display = 'none';
  }
}

function showInteractiveContent(containerId) {
  var container = document.getElementById(containerId);
  if (container === null) return;
  var interactiveContent = container.getElementsByClassName('js-enabled');
  for (var i = 0; i < interactiveContent.length; i++) {
    interactiveContent[i].style.display = 'block';
  }
}

function setCookiePreferences(preferences) {
  GOVUK.cookie('cookie_preferences', JSON.stringify(preferences), { days: 30 });
}

function initialiseBannerButtons() {
  document.getElementById('accept-cookies-button').addEventListener('click', () => {
    setCookiePreferences({essential: true, usage: true})
  });

  document.getElementById('reject-cookies-button').addEventListener('click', () => {
    setCookiePreferences({essential: true, usage: false})
  });
}

function initialiseCookieBanner() {
  // the default cookie message container from hof-govuk-template
  var bannerContainer = document.getElementById('global-cookie-message');

  // the cookie banner that will replace the container's default content if using google analytics
  var cookieBanner = document.getElementById('cookie-banner');

  if (bannerContainer !== null && cookieBanner !== null) {
    hideFallbackContent('global-cookie-message');
    showInteractiveContent('global-cookie-message');
    bannerContainer.style.display = 'block';
    initialiseBannerButtons();
  }
}

function handleSaveSettings(e) {
  e.preventDefault();
  setCookiePreferences({ essential: true, usage: document.getElementById('radio-1').checked })
}

function initialiseFormControls() {
  var preferences = JSON.parse(GOVUK.cookie('cookie_preferences'));
  var usage;

  if (preferences !== null && preferences.usage !== undefined && typeof preferences.usage === "boolean") {
    usage = preferences.usage;
  } else {
    usage = true;
  }

  document.getElementById('radio-1').checked = usage;
  document.getElementById('radio-2').checked = !usage;
  document.getElementById('save-cookie-settings').addEventListener('click', handleSaveSettings);
}

function initialiseCookiePage() {
  var shouldDisplayCookieControls = document.getElementById('cookie-settings') !== null;

  if (shouldDisplayCookieControls) {
    hideFallbackContent('cookie-settings');
    showInteractiveContent('cookie-settings');
    initialiseFormControls();
  }
}

module.exports = {
  initialiseCookieBanner,
  initialiseCookiePage
};
