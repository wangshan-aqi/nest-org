import { Module } from '@nestjs/common';
import { SignInService } from './sign-in.service';
import { SignInController } from './sign-in.controller';

@Module({
  controllers: [SignInController],
  providers: [
    SignInService,
    // {
    //   provide: 'ABC',
    //   useClass: SignInService,
    // },
    // {
    //   provide: 'Test',
    //   useValue: ['test1', 'test2'],
    // },
    {
      provide: 'Fuc',
      useFactory: () => {
        if (1) {
          return '///';
        }
      },
    },
  ],
})
export class SignInModule {}
