import { Test, TestingModule } from '@nestjs/testing';
import { BdTracesService } from './bd-traces.service';
import { FirestoreService } from '../firestore/firestore.service';
import { TraceDTO } from '../../models/dtos/trace.dto';
import DoneCallback = jest.DoneCallback;

describe('BdTracesService', () => {
  let service: BdTracesService;

  const traceMock: TraceDTO = {
    code: '',
    currencies: [],
    distanceToUsa: 0,
    ip: 'TEST',
    lat: '',
    lon: '',
    name: '',
  };

  const doc = {
    data: jest.fn().mockReturnValue(traceMock),
  };

  const docsMock = {
    docs: [doc],
    id: 'TEST',
    empty: false,
  };

  const docsSnapMock = new Promise((resolve) => resolve(docsMock));

  const whereMock = {
    limit: jest.fn().mockReturnValue({
      get: jest.fn().mockReturnValue(docsSnapMock),
    }),
  };
  const collectionMock = {
    get: jest.fn().mockReturnValue(docsSnapMock),
    add: jest.fn().mockReturnValue(docsSnapMock),
    where: jest.fn().mockReturnValue(whereMock),
  };

  const firestoreServiceMock = {
    bd: {
      collection: jest.fn().mockReturnValue(collectionMock),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BdTracesService,
        { provide: FirestoreService, useValue: firestoreServiceMock },
      ],
    }).compile();

    service = module.get<BdTracesService>(BdTracesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get trace properly', (done: DoneCallback) => {
    service.getTraces().subscribe((result: TraceDTO[]) => {
      expect(result).toEqual([traceMock]);
      done();
    });
  });

  it('should post trace properly', (done: DoneCallback) => {
    service.postTrace(traceMock).subscribe((result: string) => {
      expect(result).toEqual(traceMock.ip);
      done();
    });
  });

  it('should get trace properly', (done: DoneCallback) => {
    service.getTrace('TEST').subscribe((result: TraceDTO) => {
      expect(result).toEqual(traceMock);
      done();
    });
  });
});
