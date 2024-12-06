import { Sequelize } from "sequelize";
import User from "./user";
import Kakeibo from "./kakeibo";
import Currency from "./currency";
import LargeCategory from "./large_category";
import MiddleCategory from "./middle_category";
import KakeiboCurrency from "./kakeibo_currency";
const env = process.env.NODE_ENV || 'development';
const db_config = require(__dirname + '/../../config/database.js')[env];

// db_config.jsに追記する
Object.assign(db_config, {
    define: {
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
    benchmark: true,
    logging: (query: string, exec_time_ms: number) => {
        console.log(query, { exec_time_ms, too_long: (exec_time_ms > 1000) });
    },
    pool: {
        max: 30,
        min: 0
    }
});

const sequelize = new Sequelize(db_config.database, db_config.username, db_config.password, db_config);

const models = {
    User,
    Kakeibo,
    Currency,
    LargeCategory,
    MiddleCategory,
    KakeiboCurrency,
};

User.initModel(sequelize);
Kakeibo.initModel(sequelize);
Currency.initModel(sequelize);
LargeCategory.initModel(sequelize);
MiddleCategory.initModel(sequelize);
KakeiboCurrency.initModel(sequelize);

User.associate();
Kakeibo.associate();
Currency.associate();
LargeCategory.associate();
MiddleCategory.associate();
KakeiboCurrency.associate();

export { sequelize, models };