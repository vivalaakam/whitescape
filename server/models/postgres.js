import { sequelize, Sequelize } from './adapter';

const defaults = {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
};

export { Sequelize, sequelize, defaults };

export default class Postgres {
  constructor(collection) {
    this.collection = collection;
  }

  async list(where = {}, order = [], limit = false, offset = false) {
    const query = {
      where, order
    };

    if (limit !== false) {
      query.limit = limit;
    }
    if (offset !== false) {
      query.offset = offset;
    }
    const result = await this.collection.findAll(query);
    return result;
  }

  async count(where) {
    const result = await this.collection.count({ where });
    return result;
  }

  async getId(id) {
    const result = await this.collection.findById(id);
    return result;
  }

  async create(data) {
    const result = await this.collection.create(data);
    return result;
  }

  async update(id, data) {
    const row = await this.getId(id);
    const result = await row.update(data);
    return result;
  }

  async remove(id) {
    const row = await this.getId(id);
    const result = await row.destroy();
    return result;
  }
}
