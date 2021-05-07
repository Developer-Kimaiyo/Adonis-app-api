import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Interns extends BaseSchema {
  protected tableName = 'interns'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.integer("year").notNullable();
      table.timestamps(true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
