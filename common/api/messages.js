import Rest from './rest';

export default class Messages extends Rest {
  constructor() {
    super('/api/messages');
  }

  all({ lastTime = '', perPage = 10 }) {
    return this.getQuery(`${this.base_url}?lastTime=${lastTime}&perPage=${perPage}`);
  }
}
