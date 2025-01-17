import { Expose, Transform } from "class-transformer"

function maskMobileNumber(mobile: string) {
    if (!mobile) return mobile;
    
    const firstTwo = mobile.slice(0, 1);
    const lastTwo = mobile.slice(-3);
    const maskedPart = 'X'.repeat(mobile.length - 4);
    
    return `${firstTwo}${maskedPart}${lastTwo}`;
}

export class UserDto {
    @Expose()
    id: number

    @Expose()
    name: string

    @Expose()
    @Transform(({ value }) => maskMobileNumber(value))
    mobile: string

    @Expose()
    status: boolean
}
