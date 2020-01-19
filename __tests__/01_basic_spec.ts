import {
  expose,
  wrap,
} from '../src/index';

describe('basic spec', () => {
  it('exported function', () => {
    expect(expose).toBeDefined();
    expect(wrap).toBeDefined();
  });
});
