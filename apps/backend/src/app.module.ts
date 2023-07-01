import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ClsModule } from 'nestjs-cls';

import { AuthModule } from '@resnity/backend-auth';
import {
  EnvironmentModule,
  MongoDbModule,
  RequestContextModule,
} from '@resnity/backend-common';
import { MenuModule } from '@resnity/backend-menu';
import { OrderModule } from '@resnity/backend-order';
import { RestaurantModule } from '@resnity/backend-restaurant';

@Module({
  imports: [
    AuthModule,
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    EnvironmentModule,
    EventEmitterModule.forRoot(),
    MongoDbModule.forRoot({
      uri: 'mongodb+srv://admin:KNN5wYI61YwQ0QEA@cluster0.riucvvp.mongodb.net/?retryWrites=true&w=majority',
    }),
    RequestContextModule,

    MenuModule,
    OrderModule,
    RestaurantModule,
  ],
})
export class AppModule {}
