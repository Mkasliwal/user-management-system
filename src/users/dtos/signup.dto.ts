import {
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    IsStrongPassword,
    Length,
} from 'class-validator'

export class SignUpDto {
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    @Length(2, 20, { message: 'Name must be 2 to 20 characters long'})
    name: string

    @IsPhoneNumber('IN', {
        message: 'Please enter valid 10 digit mobile number',
    })
    mobile: string

    @IsString()
    @IsStrongPassword(
        {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        },
        {
            message:
                'Password min length should be 8 and must contain at least one uppercase letter, one lowercase letter, one number and one special character',
        }
    )
    password: string
}
