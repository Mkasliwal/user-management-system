import { Test, TestingModule } from "@nestjs/testing";
import ConfigModule from "./config.module";
import { ConfigService, envOrFail } from "./config.service";

describe('Config Service', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [ConfigModule],
        }).compile();
    })

    it('will be defined', () => {
        const service = module.get(ConfigService);
        expect(service).toBeDefined()
    })

    it('will have env variables', () => {
        const service = module.get(ConfigService);
        const APP_NAME = service.get('APP_NAME');
        expect(APP_NAME).not.toBeNull()
    })

    it('will use envOrFail on critical', () => {
        expect(envOrFail).toThrow()

        expect(() => {
            envOrFail('THIS_NOT_EXIST', 'Successfully not found')
        }).toThrow('Successfully not found')

        expect(() => {
            envOrFail('APP_NAME')
        }).not.toThrow()
    })
})
