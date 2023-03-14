import { Test, TestingModule } from '@nestjs/testing';

import { of } from 'rxjs';

import { TracesController } from './traces.controller';
import { TracesService } from './traces.service';
import DoneCallback = jest.DoneCallback;
import { TraceBodyDTO } from '../../models/bodies/trace.body';
import { headersHelper } from '../../helpers/headers.helper';
import { TraceDTO } from '../../models/dtos/trace.dto';

describe('TracesController', () => {
  let controller: TracesController;

  const tracesServiceMock = {
    postTrace: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TracesController],
      providers: [{ provide: TracesService, useValue: tracesServiceMock }],
    }).compile();

    controller = module.get<TracesController>(TracesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should post trace properly', (done: DoneCallback) => {
    headersHelper.getIpInfoApiToken = jest.fn().mockReturnValue('TEST');
    headersHelper.getLayerFixesApiKey = jest.fn().mockReturnValue('TEST');

    const bodyMock: TraceBodyDTO = {
      ip: '111.111.111.111',
    };

    const responseMock: TraceDTO = {
      code: '',
      currencies: [],
      distanceToUsa: 0,
      ip: '',
      lat: '',
      lon: '',
      name: '',
    };

    tracesServiceMock.postTrace.mockReturnValue(of(responseMock));

    controller.postTrace(bodyMock, null).subscribe((response: TraceDTO) => {
      expect(response).toEqual(responseMock);
      done();
    });
  });
});
