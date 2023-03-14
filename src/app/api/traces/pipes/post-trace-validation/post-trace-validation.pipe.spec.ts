import { PostTraceValidationPipe } from './post-trace-validation.pipe';
import { BadRequestException } from '@nestjs/common';

describe('PostTraceValidationPipe', () => {
  const pipe: PostTraceValidationPipe = new PostTraceValidationPipe();

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should validate ip properly', () => {
    try {
      expect(pipe.transform({ ip: 'TEST' }));
      expect(1).toEqual(2);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
    expect(pipe.transform({ ip: '111.111.111.111' })).toEqual({
      ip: '111.111.111.111',
    });
  });
});
