'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Characters', [
      {
        name: 'キラ・ヤマト',
        production: '機動戦士ガンダムSEED',
        age: 18,
        skill: '覚醒',
        type: '人間',
        is: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'リンク',
        production: 'ゼルダの伝説',
        age: 18,
        skill: '勇気のトライフォース',
        type: '人間',
        is: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Characters', null, {});
  }
};
