import {
  Injectable,
  type PipeTransform,
  HttpException,
  BadRequestException,
} from '@nestjs/common';

import { isIP } from 'class-validator';

import { TraceBodyDTO } from '../../../../models/bodies/trace.body';

@Injectable()
export class PostTraceValidationPipe implements PipeTransform {
  transform(value: TraceBodyDTO): TraceBodyDTO | HttpException {
    const isValidIP = isIP(value?.ip, 4);

    if (!isValidIP)
      throw new BadRequestException('The IP should respect IPv4 standard');

    return value;
  }
}
