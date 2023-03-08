import { Property, Default} from "@tsed/common";

export class AuthorInsert{
    @Property()
    name: string

    @Property()
    @Default(false)
    isDeleted: boolean
}