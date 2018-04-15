import Raven from 'raven-js';

export const sentry_url = 'https://f5679e0672714b30b1938709242ad0cf@sentry.io/1189477';

export function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  /*eslint no-console:0*/
  window && window.console && console.error && console.error(ex);
}