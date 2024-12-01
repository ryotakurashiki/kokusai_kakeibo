import { Sequelize } from "sequelize";
import User from "./user";
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
    User: User,
};

User.initModel(sequelize);

export { sequelize, models };