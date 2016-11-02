import Rest from './rest';

export default class Auth extends Rest {
  constructor() {
    super('/api/auth');
  }

  current() {
    return this.getQuery(`${this.base_url}/`);
  }

  auth({ username, password }) {
    return this.postQuery(this.base_url, { username, password });
  }

  signup({ username, password, firstName, lastName }) {
    return this.postQuery(`${this.base_url}/signup`, { username, password, firstName, lastName });
  }

  updateCurrent(data) {
    return this.putQuery(`${this.base_url}`, data);
  }
}
