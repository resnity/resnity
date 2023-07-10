import { Module, Provider } from '@nestjs/common';

import { ORGANIZATION_SERVICE_TOKEN } from '../auth.constants';
import { auth0ManagementClient } from '../libs/auth0';
import { OrganizationServiceImpl } from './organization.service';

const organizationServiceProvider: Provider = {
  provide: ORGANIZATION_SERVICE_TOKEN,
  useFactory: () => new OrganizationServiceImpl(auth0ManagementClient),
};

@Module({
  providers: [organizationServiceProvider],
  exports: [organizationServiceProvider],
})
export class OrganizationModule {}
