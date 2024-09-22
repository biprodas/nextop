import { IsUUID, IsEnum, IsDefined } from 'class-validator';
import { UpdateAction } from './update-action.dto';

export class UpdateUserRolesDto {
  @IsUUID('4')
  @IsDefined()
  role_id: string;

  @IsEnum(UpdateAction)
  @IsDefined()
  action: UpdateAction;
}
