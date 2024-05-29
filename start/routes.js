'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.post('login', 'AuthController.login');
  Route.post('register', 'AuthController.register');
  Route.put('profile', 'AuthController.profile').middleware(['auth:jwt']);

/**
 * @swagger
 * /api/v1/categorias:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get categories
 *     description: Retrieve all categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *       401:
 *         description: Unauthorized
 */
Route.get('categorias', 'CategoryController.index');

/**
 * @swagger
 * /api/v1/categorias:
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create category
 *     description: Create a new category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully
 *       401:
 *         description: Unauthorized
 */
Route.post('categorias', 'CategoryController.store').middleware(['auth:jwt']);

/**
 * @swagger
 * /api/v1/categorias/{id}:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Update category
 *     description: Update an existing category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
Route.put('categorias/:id', 'CategoryController.update').middleware(['auth:jwt']);

/**
 * @swagger
 * /api/v1/categorias/{id}:
 *   delete:
 *     tags:
 *       - Categories
 *     summary: Delete category
 *     description: Delete an existing category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
Route.delete('categorias/:id', 'CategoryController.destroy').middleware(['auth:jwt']);

Route.get('scp-items', 'ItemScpController.index');
Route.post('scp-items', 'ItemScpController.store').middleware(['auth:jwt']);
Route.put('scp-items/:id', 'ItemScpController.update').middleware(['auth:jwt']);
Route.delete('scp-items/:id', 'ItemScpController.destroy').middleware(['auth:jwt']);

}).prefix('api/v1');