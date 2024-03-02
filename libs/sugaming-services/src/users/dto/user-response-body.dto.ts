import { IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
import { UserBaseDto } from './user-base.dto';

export class UserResponseBodyDto extends UserBaseDto {
  @ApiProperty({
    description: 'User id.',
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  id!: string;

  @ApiProperty({
    description: 'User CS2 id team.',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty'),
  })
  cs2TeamId!: number;

  @ApiProperty({
    description: 'User creation date',
  })
  @IsDateString(
    {},
    {
      message: i18nValidationMessage('validation.isDateString'),
    },
  )
  createdAt!: Date;

  @ApiProperty({
    description: 'User last update date',
  })
  @IsDateString(
    {},
    { message: i18nValidationMessage('validation.isDateString') },
  )
  updatedAt!: Date;
}

export default UserResponseBodyDto;
