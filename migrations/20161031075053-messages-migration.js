'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('messages',
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        text: Sequelize.STRING,
        user_id: {
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.DATE
        }
      });
  },

  down: function (queryInterface) {
    queryInterface.dropTable('messages');
  }
};
