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
import { ValueObject } from '../../domain/value-object';
import { EmbeddedModel, Model } from '../../infrastructure/models';

export const MAPPER_TOKEN = Symbol('MAPPER_TOKEN');

export const mapper = createMapper({
  strategyInitializer: classes(),
});

export const extendBaseMaps = (mapper: Mapper) => {
  extend(createMap(mapper, Entity, ResponseDto));
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
  extend(createMap(mapper, ValueObject, EmbeddedModel));
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
  extend(createMap(mapper, EmbeddedModel, ValueObject));
};

export const initMappingProfile = (
  mapper: Mapper,
  mappingProfile: MappingProfile,
) => {
  addProfile(mapper, mappingProfile);
};
