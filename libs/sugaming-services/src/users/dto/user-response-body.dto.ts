import { IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';
// TODO:fix
// eslint-disable-next-line import/no-cycle
import { Cs2TeamResponseBodyDto } from '../../cs2/teams/dto/cs2-team-response-body.dto';
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
    description: 'User Counter-Strike 2 team.',
    type: Cs2TeamResponseBodyDto,
  })
  cs2Team!: Cs2TeamResponseBodyDto;

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
