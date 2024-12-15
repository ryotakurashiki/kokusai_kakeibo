'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
INSERT INTO large_categories (id, name, icon, color, created_at, updated_at) VALUES
(1,"食費","food.png","#FF6347","2024/12/06 17:25:30","2024/12/06 17:25:30"),
(2,"日用品","daily_necessities.png","#FFD700","2024/12/06 17:25:30","2024/12/06 17:25:30"),
(3,"趣味・娯楽","hobbies.png","#87CEEB","2024/12/06 17:25:30","2024/12/06 17:25:30"),
(4,"交際費","social.png","#FF69B4","2024/12/06 17:25:30","2024/12/06 17:25:30"),
(5,"交通費","transportation.png","#4682B4","2024/12/06 17:25:30","2024/12/06 17:25:30"),
(6,"衣服・美容","clothing.png","#FFB6C1","2024/12/06 17:25:30","2024/12/06 17:25:30"),
(7,"健康・医療","health.png","#98FB98","2024/12/06 17:25:30","2024/12/06 17:25:30"),
(8,"特別な支出","special.png","#FFA500","2024/12/06 17:25:30","2024/12/06 17:25:30"),
(9,"水道・光熱費","utilities.png","#1E90FF","2024/12/06 17:25:30","2024/12/06 17:25:30"),
(10,"通信費","communication.png","#8A2BE2","2024/12/06 17:25:30","2024/12/06 17:25:30"),
(11,"住宅","housing.png","#708090","2024/12/06 17:25:30","2024/12/06 17:25:30"),
(12,"保険","Insurance.png","#32CD32","2024/12/06 17:25:30","2024/12/06 17:25:30"),
(13,"その他","others.png","#A9A9A9","2024/12/06 17:25:30","2024/12/06 17:25:30")
`);
  },

  async down (queryInterface, Sequelize) {
  }
};
