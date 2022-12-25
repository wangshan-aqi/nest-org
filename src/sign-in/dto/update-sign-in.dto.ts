import { PartialType } from '@nestjs/swagger';
import { CreateSignInDto } from './create-sign-in.dto';

export class UpdateSignInDto extends PartialType(CreateSignInDto) {}
