import { config, DotenvConfigOptions } from 'dotenv'
import { Logger } from "@nestjs/common";

export class ConfigService {
    private readonly env: any

    constructor(opts?: DotenvConfigOptions) {
        const result = config(opts);
        this.env = result.parsed || {};
    }

    get(key, def = null) {
        return this.env[key] || process.env[key] || def;
    }
}

let serviceInstance: ConfigService = null;
const logger: Logger = new Logger('ConfigService')

export function useConfigService(opts?: DotenvConfigOptions) {
    if(!serviceInstance) {
        opts = Object.assign({
            path: process.env.NODE_ENV == 'prod' ? '.env' : '.env.dev',
        }, opts);
        serviceInstance = new ConfigService(opts);
    }
    return serviceInstance;
}

export function envOrFail(key:string, failMessage?:string) {
    const service = useConfigService()
    const value = service.get(key)
    if(!value) {
        const errorMsg = `${failMessage}: '${key}'` || `Config param '${key}' not found`;
        logger.error(errorMsg);
        throw new Error(errorMsg)
    }
    return value;
}

export function env(key:string, def = null) {
    const service = useConfigService()
    return service.get(key, def)
}
