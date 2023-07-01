import { AutoMap } from '@automapper/classes';

export class ResponseDto {
  @AutoMap()
  readonly id: string;
  @AutoMap()
  readonly createdAt: Date;
  @AutoMap()
  readonly updatedAt: Date;
}

export class EmbeddedResponseDto {}
