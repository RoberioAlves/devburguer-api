import Sequelize, { Model } from "sequelize";
import bcrygt from 'bcrypt';

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            admin: Sequelize.BOOLEAN,
        }, {
            sequelize,
        })

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrygt.hash(user.password, 10)
            }
        })

        return this;

    }

    async checkPassword(password) {
        return bcrygt.compare(password, this.password_hash)
    }
}

export default User;


