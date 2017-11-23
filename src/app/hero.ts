export class Hero {
  id: number;
  name: string;

 constructor(obj: {id: number; name: string;}) {
   this.id = obj.id;
   this.name = obj.name;
 }
}
