import * as Yup from 'yup';
import User from '../models/User'


class SessionControler {
    async store(request, response) {

        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required()
        })

        const isValid = await schema.isValid(request.body);

        const emailOrPasswordIconrrect = () => {
            return response.status(401).json({ error: 'Make sure your email or password are correct'})
        }

        if (!isValid) {
            return emailOrPasswordIconrrect();
        }

        const { email, password } = request.body;

        const user = await User.findOne({
            where: {
                email,
            }
        })

        if (!user) {
            return emailOrPasswordIconrrect();
        }

        const isSamePassword = await user.checkPassword(password);

        if(isSamePassword) {
            return emailOrPasswordIconrrect();
        }

        return response.status(201).json({
            id: user.id,
            name: user.name,
            email,
            admin: user.admin
        })
    }
}

export default new SessionControler();