import chai from 'chai'
import sinon from 'sinon'
import * as itemController from '../src/controller/item.js'
import Item from '../src/models/item.js'
const { expect } = chai;

describe('verify the getItems function', () => {
    it('should get the item as a response'), () => {
    }
})

// describe('Verify AuthJWT class', function () {
//     describe('isAdmin function', function () {
//       it('should Pass when user is Admin', function (done) {
//         // Fake result user findById.
//         const fakeUser = { roles: ['5ef3bd3f4144ae5898347e4e'] };
//         const fakeErrUser = null;
//         // Create stub for User findById.
//         const stubUserFindByID = sinon.stub(db.user, 'findById');
//         stubUserFindByID.returns({
//           exec: (arg1) => {
//             // Inject fakeErrUser and fakeUser result here.
//             arg1(fakeErrUser, fakeUser);
//           },
//         });
  
//         // Fake result role find.
//         const fakeRole = [{ _id: '5ef3bd3f4144ae5898347e4e', name: 'admin', __v: 0 }];
//         const fakeErrRole = null;
  
//         // Create stub for Role find.
//         const stubRoleFind = sinon.stub(db.role, 'find');
//         stubRoleFind.callsFake((arg1, arg2) => {
//           // Inject fakeErrRole and fakeRole result here.
//           arg2(fakeErrRole, fakeRole);
//         });
  
//         // Create fake response: empty object because no activity.
//         const fakeRes = {};
//         // Create fake request.
//         // Note: I remove body property!
//         const fakeReq = { userId: '123', email: 'test@test.com', roles: ['admin'] };
//         // Create fake for next function (fake is sufficient).
//         const fakeNext = sinon.fake();
  
//         // Call function under test.
//         middleware.isAdmin(fakeReq, fakeRes, fakeNext);
  
//         // Verify stub user findById get called once.
//         expect(stubUserFindByID.calledOnce).to.equal(true);
//         // Make sure stub user findById called once with correct argument.
//         expect(stubUserFindByID.calledOnceWith(fakeReq.userId)).to.equal(true);
  
//         // Verify stub role find get called once.
//         expect(stubRoleFind.calledOnce).to.equal(true);
//         // Make sure stub role find called with correct argument.
//         // Note: alternative style.
//         expect(stubRoleFind.args[0][0]).to.deep.equal({
//           // Query use fakeUser result.
//           _id: { $in: fakeUser.roles },
//         });
  
//         // Finally for this case: make sure fakeNext get called.
//         expect(fakeNext.calledOnce).to.equal(true);
  
//         // Do not forget to restore the stubs.
//         stubUserFindByID.restore();
//         stubRoleFind.restore();
  
//         done();
//       });
//     });
//   });