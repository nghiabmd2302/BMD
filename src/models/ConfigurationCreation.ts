import { Property } from "@tsed/common";
import { Configuration } from "../entities/Configuration";

export class ConfigurationInsert {
    @Property()
    param: string

    @Property()
    value: string

    @Property()
    note: string

    toConfiguration() {
        const configuration = new Configuration()
        configuration.param = this.param
        configuration.value = this.value
        configuration.note = this.note
        return configuration
    }
}
