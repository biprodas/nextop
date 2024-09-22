import { AuthTokenResponseDto } from '@admin/token/dtos/auth-token-response.dto';
import { UserResponseDto } from '@admin/user/dtos/user-response.dto';

export class RegisterResponseDto {
  user: UserResponseDto;
  token: AuthTokenResponseDto;
}
