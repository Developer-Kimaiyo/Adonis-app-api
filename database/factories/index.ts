import Factory from "@ioc:Adonis/Lucid/Factory";
import Intern from "App/Models/Intern";
 import Stack from "App/Models/Stack";

 export const StackFactory = Factory.define(Stack, ({ faker }) => {
   return {
     name: faker.random.arrayElement([
       "Vue",
       "Flutter",
       "Golang",
       "Quarkus",
       "Adonis",
     ]),
   };
 }).build();
 export const InternFactory = Factory.define(Intern, ({ faker }) => {
   return {
     name: faker.internet.userName(),
     email: faker.internet.email(),
     year: faker.random.arrayElement([
       2000,
       2001,
       2002,
       2003,
       2004,
       2005,
       2006,
       2007,
       2008,
       2009,
       2010,
       2011,
       2012,
       2013,
       2014,
       2015,
       2016,
       2017,
       2018,
       2019,
       2020,
     ]),
   };
 })
   .relation("stacks", () => StackFactory) // 👈
   .build();
