import { Core } from "../core/entity/Core";
import { Column, Entity } from "typeorm";
@Entity("news")
export class News extends Core {
  @Column({ default: false })
  isDeleted: boolean;

  @Column()
  title: string;

  @Column()
  thumbnail: string;

  @Column()
  body: string;

  @Column()
  image: string;

  @Column({ default: false })
  isHighlight: boolean;

  @Column({ default: false })
  isRemove: boolean;
}
