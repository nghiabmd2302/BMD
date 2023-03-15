import { Core } from "../core/entity/Core";
import { Entity, Column, ManyToOne} from "typeorm";
import { Role } from "./Role";

@Entity("staff")
export class Staff extends Core {
  

  @Column()
  phone: string;
  
  @Column()
  name: string;
  
  @Column()
  email: string;
  
  @Column()
  description: string;
  
  @Column()
  avatar: string;
  
  @Column()
  isBlock: boolean;
  
  @Column()
  username: string;
  
  @Column({ select: false })
  password: string;
  
  @Column()
  isSupperAdmin: boolean;
  
  @Column()
  updatePasswordAt: number;
  
  @ManyToOne(() => Role, (role) => role.staffs)
  role: Role;
  
  async assignRole(roleId: number) {
    this.role = await Role.findOneAndThrow({ where: { id: roleId } }, roleId);
  }
}

