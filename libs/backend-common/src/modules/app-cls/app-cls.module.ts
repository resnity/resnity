import { Module } from '@nestjs/common';
import { ClsModule, ClsService } from 'nestjs-cls';

import { AppClsService } from './app-cls.service';

@Module({
  imports: [ClsModule.forFeature()],
  providers: [{ provide: AppClsService, useExisting: ClsService }],
  exports: [AppClsService],
})
export class AppClsModule {}
