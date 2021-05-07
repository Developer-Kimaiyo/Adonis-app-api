import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class StackInterns extends BaseSchema {
  protected tableName = 'stack_interns'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
    table.integer("intern_id").unsigned().references("id").inTable("interns");
    table.integer("stack_id").unsigned().references("id").inTable("stacks");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
