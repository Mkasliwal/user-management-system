import { Global, Module } from "@nestjs/common";
import { ConfigService, useConfigService } from "./config.service";

@Global()
@Module({
    providers: [
        { provide: ConfigService, useValue: useConfigService() }
    ],
    exports: [ConfigService]
})
export default class ConfigModule {}
