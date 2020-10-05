'use strict';

function hideFallbackContent() {
  var fallbackContent = document.getElementsByClassName('js-disabled');
  for (var i = 0; i < fallbackContent.length; i++) {
    fallbackContent[i].style.display = 'none';
  }
}

function showInteractiveContent() {
  var interactiveContent = document.getElementsByClassName('js-enabled');
  for (var i = 0; i < interactiveContent.length; i++) {
    interactiveContent[i].style.display = 'block';
  }
}

function initialiseCookieBanner() {
  // the default cookie message container from hof-govuk-template
  var bannerContainer = document.getElementById('global-cookie-message');

  // the cookie banner that will replace the container's default content if using google analytics
  var cookieBanner = document.getElementById('cookie-banner');

  if (bannerContainer !== null && cookieBanner !== null) {
    hideFallbackContent();
    showInteractiveContent();
    bannerContainer.style.display = 'block';
  }
}

module.exports = {
  initialiseCookieBanner
};
