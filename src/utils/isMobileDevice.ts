import MobileDetect from 'mobile-detect';

export function isMobileDevice() {
  const md = new MobileDetect(window.navigator.userAgent);

  return md.mobile() !== null;
}
