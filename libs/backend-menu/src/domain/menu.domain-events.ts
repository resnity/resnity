import { CreateEventPayload, DomainEvent } from '@resnity/backend-common';

export class CategoryAddedDomainEvent extends DomainEvent {
  readonly categoryId: string;
  readonly categoryName: string;

  constructor(payload: CreateEventPayload<CategoryAddedDomainEvent>) {
    super(payload);
    this.categoryId = payload.categoryId;
    this.categoryName = payload.categoryName;
  }
}

export class CategoryRemovedDomainEvent extends DomainEvent {
  readonly categoryId: string;

  constructor(payload: CreateEventPayload<CategoryRemovedDomainEvent>) {
    super(payload);
    this.categoryId = payload.categoryId;
  }
}

export class ItemAddedDomainEvent extends DomainEvent {
  readonly itemId: string;
  readonly itemName: string;

  constructor(payload: CreateEventPayload<ItemAddedDomainEvent>) {
    super(payload);
    this.itemId = payload.itemId;
    this.itemName = payload.itemName;
  }
}

export class ItemRemovedDomainEvent extends DomainEvent {
  readonly itemId: string;

  constructor(payload: CreateEventPayload<ItemRemovedDomainEvent>) {
    super(payload);
    this.itemId = payload.itemId;
  }
}

export class MenuCreatedDomainEvent extends DomainEvent {
  readonly name: string;
  readonly restaurantId: string;

  constructor(payload: CreateEventPayload<MenuCreatedDomainEvent>) {
    super(payload);
    this.name = payload.name;
    this.restaurantId = payload.restaurantId;
  }
}

export class MenuUpdatedDomainEvent extends DomainEvent {
  readonly menuName: string;

  constructor(payload: CreateEventPayload<MenuUpdatedDomainEvent>) {
    super(payload);
    this.menuName = payload.menuName;
  }
}

export class ModifierAddedDomainEvent extends DomainEvent {
  readonly modifierId: string;
  readonly modifierName: string;

  constructor(payload: CreateEventPayload<ModifierAddedDomainEvent>) {
    super(payload);
    this.modifierId = payload.modifierId;
    this.modifierName = payload.modifierName;
  }
}

export class ModifierRemovedDomainEvent extends DomainEvent {
  readonly modifierId: string;

  constructor(payload: CreateEventPayload<ModifierRemovedDomainEvent>) {
    super(payload);
    this.modifierId = payload.modifierId;
  }
}
