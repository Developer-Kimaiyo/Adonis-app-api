import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {
  schema,
  rules, // 👈 import validator
} from "@ioc:Adonis/Core/Validator";
import Intern from 'App/Models/Intern';


export default class InternsController {
  /**
   * @swagger
   * definitions:
   *   InternBody:
   *     properties:
   *       name:
   *         type: string
   *       email:
   *         type: string
   *       stack:
   *         type: string
   */
  /**
   * @swagger
   * /interns:
   *   get:
   *     tags:
   *       - Interns
   *     description: Returns all interns
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of interns
   *         schema:
   *           $ref: '#/definitions/InternBody'
   */

  public async index({ auth }: HttpContextContract) {
    await auth.use("api").authenticate();
    const intern = await Intern.query().preload("stacks");

    return intern;
  }

  /**
   * @swagger
   * /interns:
   *   post:
   *     tags:
   *       - Interns
   *     summary: Creates a new intern
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: intern
   *         description: Interns object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/InternBody'
   *     responses:
   *       200:
   *         description:  Successfully created
   */
  public async store({ request, auth }: HttpContextContract) {
    await auth.use("api").authenticate();
    const data = request.only(["name", "email", "stack"]);
    // const internsSchema = schema.create({
    //   name: schema.string(),
    //   email: schema.string({}, [rules.email()]),
    //   stack: schema.string(),
    // });

  const stack1 = data.stack[0];
  const stack2 = data.stack[1];
  const stack3 = data.stack[3];

    // await request.validate({ schema: internsSchema });
    const stacks1 = new Intern();
    stack1.name = stack1;
    const stacks2 = new Intern();
    stack2.name = stack2;
    const stacks3 = new Intern();
    stack3.name = stack3;

    const intern = new Intern();
    intern.name = data.name;
    intern.email = data.email;

    await intern.related("stacks").saveMany([stacks1, stacks2, stacks3]);
    return intern;
  }

  /**
   * @swagger
   * /interns/{id}:
   *   get:
   *     tags:
   *       - Interns
   *     description: Returns a single intern
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Intern id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: A single intern
   *         schema:
   *           $ref: '#/definitions/InternBody'
   */
  public async show({ params, auth }: HttpContextContract) {
    await auth.use("api").authenticate();
    const intern = await Intern.query()
      .preload("stacks")
      .where("id", params.id);
    return intern;
  }

  /**
   * @swagger
   * /interns/{id}:
   *   delete:
   *     tags:
   *       - Interns
   *     description:  Deletes a single intern
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Intern id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully deleted
   */
  public async destroy({ params, auth }: HttpContextContract) {
    await auth.use("api").authenticate();
    const intern = await Intern.find(params.id);
    await intern?.related("stacks").detach();
    intern?.delete();
  }

  /**
   * @swagger
   * /interns/{id}:
   *   put:
   *     tags:
   *       - Interns
   *     summary: Updates a single  intern
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Intern id
   *         in: path
   *         required: true
   *         type: integer
   *       - name: intern
   *         description: Interns object
   *         in: body
   *         schema:
   *           type: array
   *           $ref: '#/definitions/InternBody'
   *     responses:
   *       200:
   *         description:  Successfully updated
   */
  public async update({ params, request, auth }: HttpContextContract) {
    await auth.use("api").authenticate();
    const data = request.only(["name", "email", "stack"]);
    const intern = await Intern.findOrFail(params.id);
    intern.name = data.name;
    intern.email = data.email;
    await intern.save();
  }
}
