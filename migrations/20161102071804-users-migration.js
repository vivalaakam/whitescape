'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'firstName', Sequelize.STRING);
    queryInterface.addColumn('users', 'lastName', Sequelize.STRING);

  },

  down: function (queryInterface) {
    queryInterface.removeColumn('users', 'firstName');
    queryInterface.removeColumn('users', 'lastName');
  }
};
