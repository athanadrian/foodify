import UnAuthenticatedError from '../errors/unauthenticated.js';

const checkPermissions = (requestUser, resourceUser) => {
  // in case we have roles
  // if(requestUser.role==='admin')return;
  if (requestUser.userId === resourceUser.toString()) return;
  throw new UnAuthenticatedError('You are not authorized for this resource!');
};

export default checkPermissions;
