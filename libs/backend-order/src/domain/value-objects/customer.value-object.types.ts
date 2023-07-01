import { z } from 'zod';

import { EntityId } from '@resnity/backend-common';

import { Contact } from './contact.value-object';

export const CustomerUserId = EntityId.brand<'CustomerUserId'>();
export type CustomerUserId = z.infer<typeof CustomerUserId>;

export const CustomerName = z.string().min(2).max(50).brand<'CustomerName'>();
export type CustomerName = z.infer<typeof CustomerName>;

export const CustomerContact = z.instanceof(Contact).brand<'CustomerContact'>();
export type CustomerContact = z.infer<typeof CustomerContact>;
