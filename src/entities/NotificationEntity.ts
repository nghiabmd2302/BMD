import { Core } from "../core/entity/Core";
import { Column, Entity } from "typeorm";
@Entity("notification")
export class Notification extends Core {
  @Column({ default: false })
  isDeleted: boolean;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ default: true })
  isNoticed: boolean;
}
