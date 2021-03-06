import requireCfnRolePolicy from './require-cfn-role'

describe('requireCfnRolePolicy', () => {
  let policy
  let declaration

  beforeEach(() => {
    policy = { approve: jest.fn(), warn: jest.fn(), Failure: Error }
    declaration = { provider: {} }
  })

  it('passes if cfnRole is set', () => {
    declaration.provider.cfnRole = 'arn:aws:blablabla'
    requireCfnRolePolicy(policy, { declaration })
    expect(policy.approve).toHaveBeenCalledTimes(1)
    expect(policy.warn).toHaveBeenCalledTimes(0)
  })

  it('forbids if cfnRole is not set', () => {
    expect(() => requireCfnRolePolicy(policy, { declaration })).toThrow('no cfnRole set')
    expect(policy.approve).toHaveBeenCalledTimes(0)
    expect(policy.warn).toHaveBeenCalledTimes(0)
  })
})
