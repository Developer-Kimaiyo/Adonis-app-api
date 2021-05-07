// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Intern from "App/Models/Intern";

export default class CohortsController {
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
  /**
   * @swagger
   * /interns/{year}:
   *   get:
   *     tags:
   *       - Interns
   *     description: Returns interns in  certain year
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: year
   *         description: Intern year
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: interns per year
   *         schema:
   *           $ref: '#/definitions/InternBody'
   */
  public async findByYear(ctx) {
    await ctx.auth.use("api").authenticate();
    const year = ctx.request.only(["year"]);
    const query = parseInt(year.year);
    try {
      const users = await Intern.query().preload("stacks").where("year", query);
      return users;
    } catch (err) {
      ctx.response.status(400).send({ message: err });
    }
  }
}
