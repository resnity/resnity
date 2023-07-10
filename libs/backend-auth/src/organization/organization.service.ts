import { ManagementClient as Auth0ManagementClient, Organization } from 'auth0';

import { InternalServerError, isNil } from '@resnity/backend-common';

export type OrganizationService = {
  getOrganizationById(organizationId: string): Promise<Organization>;
};

export class OrganizationServiceImpl implements OrganizationService {
  constructor(private readonly _client: Auth0ManagementClient) {}

  async getOrganizationById(organizationId: string) {
    const organizationsManager = this._getOrganizationsManager();
    return await organizationsManager.getByID({
      id: organizationId,
    });
  }

  private _getOrganizationsManager() {
    const organizationsManager = this._client.organizations;
    if (isNil(organizationsManager)) throw new InternalServerError();
    return organizationsManager;
  }
}
