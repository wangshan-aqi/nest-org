import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SignInService } from './sign-in.service';
import { SignInController } from './sign-in.controller';
import { Logger } from 'src/middleware';
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
export class SignInModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // consumer.apply(Logger).forRoutes('signIn');
    // consumer.apply(Logger).forRoutes({
    //   path: 'signIn',
    //   method: RequestMethod.GET,
    // });
    consumer.apply(Logger).forRoutes(SignInController);
  }
}
