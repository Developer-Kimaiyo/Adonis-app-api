
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

/** 
*  @swagger
*  definitions:
*    Stack:
*      type: object
*      properties:
*        id:
*          type: uint
*        name:
*          type: string
*      required:
*        - name
*/
export default class Stack extends BaseModel {
  public static table = "stacks";
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;
}
