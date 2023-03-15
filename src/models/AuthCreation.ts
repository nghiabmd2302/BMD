import {Required, Property} from "@tsed/common";

export class AuthInsert{
  @Required()
  username: string;

  @Required()
  password: string;

}


export class AuthUpdate {
  @Property()
  description: string;

  @Property()
  name: string;

  @Property()
  avatar: string;

  @Property()
  phone: string;

  @Property()
  isBlock: boolean;


}

export class AuthPassword {
    @Property()
    oldPassword: string

    @Property()
    newPassword: string
}