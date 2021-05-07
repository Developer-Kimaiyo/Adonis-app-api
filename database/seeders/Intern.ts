import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { InternFactory } from 'Database/factories';

export default class InternSeeder extends BaseSeeder {
  public async run () {
   await InternFactory.with("stacks", 3).makeMany(10);  
    
 
  }
}
