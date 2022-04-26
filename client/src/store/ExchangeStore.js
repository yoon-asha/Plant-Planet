import { makeAutoObservable } from 'mobx';

class ExchangeStore {
  // 선언(초기값)
  email = 'text';

  constructor() {
    makeAutoObservable(this);
  }

  // 설정
  setEmail(email) {
    this.email = email;
  }
}

export default new ExchangeStore();
