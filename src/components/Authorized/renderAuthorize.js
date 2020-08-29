/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-mutable-exports */
let CURRENT =JSON.parse(localStorage.getItem('roles')) ;

/**
 * use  authority or getAuthority
 * @param {string|()=>String} currentAuthority
 */
const renderAuthorize = Authorized => currentAuthority => {
  if (currentAuthority) {
    if (typeof currentAuthority === 'function') {
      CURRENT = currentAuthority();
    }

    if (
      Object.prototype.toString.call(currentAuthority) === '[object String]' ||
      Array.isArray(currentAuthority)
    ) {
      CURRENT = currentAuthority;
    }
  } else {
    CURRENT = JSON.parse(localStorage.getItem('roles'));
  }

  return Authorized;
};

export { CURRENT };
export default Authorized => renderAuthorize(Authorized);
