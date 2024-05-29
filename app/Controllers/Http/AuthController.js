'use strict'

const User = use('App/Models/User');

class AuthController {
  /**
   * @swagger
   * /api/v1/login:
   *   post:
   *     tags:
   *       - Auth
   *     summary: Login
   *     description: User login
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               user:
   *                 type: object
   *                 properties:
   *                   email:
   *                     type: string
   *                   password:
   *                     type: string
   *     responses:
   *       200:
   *         description: Successful login
   *       401:
   *         description: Unauthorized
   */
  async login ({request, response, auth}) {
    const  {user}  = request.all();
    const logged = await auth.attempt(user.email, user.password, true);
    return response.json(logged);
  }

  /**
   * @swagger
   * /api/v1/register:
   *   post:
   *     tags:
   *       - Auth
   *     summary: Login
   *     description: User login
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               user:
   *                 type: object
   *                 properties:
   *                   email:
   *                     type: string
   *                   password:
   *                     type: string
   *     responses:
   *       200:
   *         description: Successful login
   *       401:
   *         description: Unauthorized
   */
  async register({request, response, auth }) {
    const userInstance = new User();
    const {user}  = request.all();

    userInstance.username = user.email;
    userInstance.email = user.email;
    userInstance.password = user.password;

    await userInstance.save();

    let token = await auth.generate(userInstance)
    Object.assign(userInstance, token)

    return response.json(userInstance);
  }

  /**
   * @swagger
   * /api/v1/profile:
    *   put:
   *     tags:
   *       - Auth
   *     summary: Update profile
   *     description: Update user profile
   *     security:
   *       - jwt: []
   *     parameters:
   *       - name: body
   *         in: body
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *             email:
   *               type: string
   *     responses:
   *       200:
   *         description: Profile updated
   *       401:
   *         description: Unauthorized
   */
  async profile ({request, response, auth}) {
    let user = await auth.getUser();
    const userInput = request.input('user');
    user.email = userInput['email'];
    user.username = userInput['username'];
    await user.save();

    const logged = await auth.generate(user, true);
    return response.json(logged);
  }
}

module.exports = AuthController