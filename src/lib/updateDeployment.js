/*
 * Update Deployment
 */

import _ from 'lodash'
import { updateDeployment, getAccessKeyForTenant, getServiceUrl } from '@serverless/platform-sdk'

export default async function(ctx) {
  // If deployment data is not on state, skip
  if (!ctx.state.deployment || !ctx.state.deployment.deploymentId) {
    return
  }

  // Defaults
  const accessKey = await getAccessKeyForTenant(ctx.sls.service.tenant)

  ctx.sls.cli.log('Publishing service to the Enterprise Dashboard...', 'Serverless Enterprise')

  const cfResources = await ctx.provider.getStackResources()
  const accountId = await ctx.provider.getAccountId()
  const cfnStack = await ctx.provider.request('CloudFormation', 'describeStacks', {
    StackName: ctx.provider.naming.getStackName()
  })
  const serviceEndpoint = _.find(cfnStack.Stacks[0].Outputs, ({ OutputKey }) =>
    OutputKey.match(ctx.provider.naming.getServiceEndpointRegex())
  )
  const apiId = serviceEndpoint && serviceEndpoint.OutputValue.split('https://')[1].split('.')[0]
  const deploymentData = {
    accessKey,
    tenant: ctx.sls.service.tenant,
    app: ctx.sls.service.app,
    serviceName: ctx.sls.service.service,
    deploymentId: ctx.state.deployment.deploymentId,
    status: 'success',
    computedData: {
      accountId,
      apiId,
      physicalIds: cfResources.map((cfR) => ({
        logicalId: cfR.LogicalResourceId,
        physicalId: cfR.PhysicalResourceId
      }))
    }
  }

  await updateDeployment(deploymentData)
  // TODO: Track Stat

  const serviceUrlData = {
    tenant: deploymentData.tenant,
    app: deploymentData.app,
    name: deploymentData.serviceName
  }
  const serviceUrl = getServiceUrl(serviceUrlData)
  ctx.sls.cli.log(
        `Successfully published your service to the Enterprise Dashboard: ${serviceUrl}`, // eslint-disable-line
    'Serverless Enterprise'
  )

  // Mark deployment as complete
  ctx.state.deployment.complete = true
}
