import { BoolStringPipe } from './bool-string.pipe';

describe('BoolStringPipe', () => {
  it('create an instance', () => {
    const pipe = new BoolStringPipe();
    expect(pipe).toBeTruthy();
  });
});
