export class CustomerUserModel {

  constructor(public userEmail: string, public userId: string, private token: string, public expiration: Date) {

  }

  // Accessible via : user.userToken
  get userToken() {
    // token expired or not found.
    if(!this.expiration || this.expiration < new Date()) {
      return null;
    }
    return this.token;
  }
}
