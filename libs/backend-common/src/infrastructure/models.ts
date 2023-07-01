import { AutoMap } from '@automapper/classes';

export class Model {
  @AutoMap()
  readonly _id: string;
  @AutoMap()
  readonly createdAt: Date;
  @AutoMap()
  readonly updatedAt: Date;
}

export class TenantAwareModel extends Model {
  tenantId?: string;
}

export class EmbeddedModel {}
