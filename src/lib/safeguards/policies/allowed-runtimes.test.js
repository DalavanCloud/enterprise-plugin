import allowedRuntimesPolicy from './allowed-runtimes'

describe('allowedRuntimesPolicy', () => {
  let policy
  let declaration

  beforeEach(() => {
    policy = { approve: jest.fn(), warn: jest.fn(), Failure: Error }
    declaration = { provider: {}, functions: { func: {} } }
  })

  it('allows global python3.6 with options ["python3.6"]', () => {
    declaration.provider.runtime = 'python3.6'
    allowedRuntimesPolicy(policy, { declaration }, ['python3.6'])
    expect(policy.approve).toHaveBeenCalledTimes(1)
    expect(policy.warn).toHaveBeenCalledTimes(0)
  })

  it('forbids fn-level python3.6 with options ["nodejs8.10"]', () => {
    declaration.provider.runtime = 'nodejs8.10'
    declaration.functions.func.runtime = 'python3.6'
    expect(() => allowedRuntimesPolicy(policy, { declaration }, ['nodejs8.10'])).toThrow(
      'Runtime of function func not in list of permitted runtimes: ["nodejs8.10"]'
    )
    expect(policy.approve).toHaveBeenCalledTimes(0)
    expect(policy.warn).toHaveBeenCalledTimes(0)
  })

  it('forbids global non-overriden python3.6 with options ["nodejs8.10"]', () => {
    declaration.provider.runtime = 'python3.6'
    expect(() => allowedRuntimesPolicy(policy, { declaration }, ['nodejs8.10'])).toThrow(
      'Runtime of function func not in list of permitted runtimes: ["nodejs8.10"]'
    )
    expect(policy.approve).toHaveBeenCalledTimes(0)
    expect(policy.warn).toHaveBeenCalledTimes(0)
  })
})
