import { Core } from "../core/entity/Core";
import { Column, Entity, PrimaryGeneratedColumn, SaveOptions } from "typeorm";

@Entity("core")
export class CoreEntity extends Core {
//   static saveanything() {
//     throw new Error("Method not implemented.");
//   }
  @Column()
  name: string;
}
