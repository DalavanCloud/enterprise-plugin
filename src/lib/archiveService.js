/*
 * Archive Service
 */

import { archiveService, getAccessKeyForTenant } from '@serverless/platform-sdk'

export default async function(ctx) {
  // Defaults
  const accessKey = await getAccessKeyForTenant(ctx.sls.service.tenant)

  ctx.sls.cli.log('Archiving this service in the Enterprise Dashboard...', 'Serverless Enterprise')

  const data = {
    name: ctx.sls.service.service,
    tenant: ctx.sls.service.tenant,
    app: ctx.sls.service.app,
    provider: ctx.sls.service.provider.name,
    region: ctx.sls.service.provider.region,
    accessKey
  }

  return archiveService(data)
    .then(() => {
      ctx.sls.cli.log(
        'Successfully archived this service in the Enterprise Dashboard...',
        'Serverless Enterprise'
      )
    })
    .catch((err) => {
      ctx.sls.cli.log(
        'Failed to archive this service in the Enterprise Dashboard...',
        'Serverless Enterprise'
      )
      throw new Error(err)
    })
}
