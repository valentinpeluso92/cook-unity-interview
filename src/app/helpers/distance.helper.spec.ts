import { distanceHelper } from './distance.helper';

describe('Distance helper', () => {
  it('should get distance properly', () => {
    expect(
      distanceHelper.getDistance(-34.6131, -58.3772, 8.3512, -62.641),
    ).toEqual(4798.442127729733);
  });
  it('should get distance to usa properly', () => {
    expect(distanceHelper.getDistanceToUSA(-34.6131, -58.3772)).toEqual(
      8396.335386526142,
    );
  });
});
