import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  manyToMany,
  ManyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Stack from "./Stack";
/**
 *  @swagger
 *  definitions:
 *    Interns:
 *      type: object
 *      properties:
 *        id:
 *          type: uint
 *        name:
 *          type: string
 *        email:
 *          type: string
 *      required:
 *        - name
 *        - email
 */

export default class Intern extends BaseModel {
  public static table = "interns";
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column()
  public year: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => Stack, {
    pivotTable: "stack_interns",
    localKey: "id",
    pivotForeignKey: "intern_id",
    relatedKey: "id",
    pivotRelatedForeignKey: "stack_id",
  })
  public stacks: ManyToMany<typeof Stack>;
}
