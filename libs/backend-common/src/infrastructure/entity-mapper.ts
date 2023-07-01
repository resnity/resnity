export interface EntityMapper<
  TDomainEntity = unknown,
  TResponseDto = unknown,
  TPersistenceModel = unknown,
> {
  toResponseDto(entity: TDomainEntity): TResponseDto;

  toResponseDtos(entities: TDomainEntity[]): TResponseDto[];

  toPersistenceModel(entity: TDomainEntity): TPersistenceModel;

  toPersistenceModels(entities: TDomainEntity[]): TPersistenceModel[];

  fromPersistenceModel(model: TPersistenceModel): TDomainEntity;

  fromPersistenceModels(models: TPersistenceModel[]): TDomainEntity[];
}
