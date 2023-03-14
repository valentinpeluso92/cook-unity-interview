import { Module } from '@nestjs/common';
import { BdTracesService } from './bd-traces/bd-traces.service';
import { FirestoreService } from './firestore/firestore.service';

@Module({
  providers: [FirestoreService, BdTracesService],
  exports: [FirestoreService, BdTracesService],
})
export class BdModule {}
