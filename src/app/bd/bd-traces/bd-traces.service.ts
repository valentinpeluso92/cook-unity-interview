import { Injectable } from '@nestjs/common';

import { from, map, Observable } from 'rxjs';

import { FirestoreService } from '../firestore/firestore.service';
import { TraceDTO } from '../../models/dtos/trace.dto';

@Injectable()
export class BdTracesService {
  private collectionName = 'traces';

  constructor(private readonly firestoreService: FirestoreService) {}

  getTraces(): Observable<TraceDTO[]> {
    const ref = this.getRef();
    return from(ref.get()).pipe(
      map((docsSnap) => docsSnap.docs.map((doc) => doc.data()) as TraceDTO[]),
    );
  }

  postTrace(trace: TraceDTO): Observable<string> {
    const ref = this.getRef();

    return from(ref.add(trace)).pipe(map((docSnap) => docSnap.id));
  }

  getTrace(ip: string): Observable<TraceDTO> {
    const ref = this.getRef();

    return from(ref.where('ip', '==', ip).limit(1).get()).pipe(
      map((docSnap) =>
        !docSnap.empty ? (docSnap.docs[0].data() as TraceDTO) : null,
      ),
    );
  }

  private getRef() {
    return this.firestoreService.bd.collection(this.collectionName);
  }
}
