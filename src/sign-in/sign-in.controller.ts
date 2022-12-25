import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { SignInService } from './sign-in.service';
import { CreateSignInDto } from './dto/create-sign-in.dto';
import { UpdateSignInDto } from './dto/update-sign-in.dto';

@Controller('signIn')
export class SignInController {
  constructor(
    private readonly signInService: SignInService,
    // @Inject('ABC') private readonly signInService: SignInService,
    // @Inject('Test') private readonly shop: string[],
    @Inject('Fuc') private readonly shop: string,
  ) {}

  @Post()
  create(@Body() createSignInDto: CreateSignInDto) {
    return this.signInService.create(createSignInDto);
  }

  @Get()
  findAll() {
    return this.shop;
    // return this.signInService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSignInDto: UpdateSignInDto) {
    return this.signInService.update(+id, updateSignInDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signInService.remove(+id);
  }
}
