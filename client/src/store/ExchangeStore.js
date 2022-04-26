import { makeAutoObservable } from 'mobx';

class ExchangeStore {
  // 선언(초기값)
  accessToken = '';
  userID = 0;
  email = '';
  desc = '';
  address = '';

  constructor() {
    makeAutoObservable(this);
  }

  // 설정
  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  setUserID(userID) {
    this.userID = userID;
  }

  setEmail(email) {
    this.email = email;
  }

  setDesc(desc) {
    this.desc = desc;
  }

  setAddress(address) {
    this.address = address;
  }
}

export default new ExchangeStore();
