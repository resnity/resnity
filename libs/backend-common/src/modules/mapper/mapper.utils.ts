import { classes } from '@automapper/classes';
import {
  Mapper,
  MappingProfile,
  addProfile,
  createMap,
  createMapper,
  extend,
  forMember,
  mapFrom,
} from '@automapper/core';

import { ResponseDto } from '../../api/response-dtos';
import { Entity } from '../../domain/entity';
import { Model } from '../../infrastructure/models';

export const MAPPER_TOKEN = Symbol('MAPPER_TOKEN');

export const mapper = createMapper({
  strategyInitializer: classes(),
});

export const extendBaseEntityToResponseDtoMap = (mapper: Mapper) =>
  extend(createMap(mapper, Entity, ResponseDto));

export const extendBaseEntityToModelMap = (mapper: Mapper) =>
  extend(
    createMap(
      mapper,
      Entity,
      Model,
      forMember(
        (destination) => destination._id,
        mapFrom((source) => source.id),
      ),
    ),
  );

export const extendBaseModelToEntityMap = (mapper: Mapper) =>
  extend(
    createMap(
      mapper,
      Model,
      Entity,
      forMember(
        (destination) => destination.id,
        mapFrom((source) => source._id),
      ),
    ),
  );

export const initMappingProfile = (
  mapper: Mapper,
  mappingProfile: MappingProfile,
) => {
  addProfile(mapper, mappingProfile);
};
