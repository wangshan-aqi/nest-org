import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { UploadModule } from './upload/upload.module';
import { SignInController } from './sign-in/sign-in.controller';
import { SignInService } from './sign-in/sign-in.service';
import { SignInModule } from './sign-in/sign-in.module';
import { SignUpModule } from './sign-up/sign-up.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Chang521',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BooksModule,
    AuthModule,
    MenuModule,
    UploadModule,
    SignInModule,
    SignUpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
