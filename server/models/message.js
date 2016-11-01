import Postgres, { Sequelize, sequelize, defaults } from './postgres';

const model = sequelize.define('messages', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  text: {
    type: Sequelize.STRING
  },
  user_id: {
    type: Sequelize.UUID
  }
}, defaults);

export default class Message extends Postgres {
  constructor() {
    super(model);
  }
}

export {
  model
};
