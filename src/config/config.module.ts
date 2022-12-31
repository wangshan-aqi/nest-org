import { Module, DynamicModule, Global } from '@nestjs/common';
interface Options {
  url: string;
}

@Global() // 全局模块
@Module({
  //   providers: [
  //     {
  //       provide: 'Config',
  //       useValue: {
  //         baseUrl: '/api',
  //       },
  //     },
  //   ],
  //   exports: [
  //     {
  //       provide: 'Config',
  //       useValue: {
  //         baseUrl: '/api',
  //       },
  //     },
  //   ],
})
// 动态模块
export class ConfigModule {
  static forRoot(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'Config',
          useValue: {
            baseUrl: '/api' + options.url,
          },
        },
      ],
      exports: [
        {
          provide: 'Config',
          useValue: {
            baseUrl: '/api' + options.url,
          },
        },
      ],
    };
  }
}
