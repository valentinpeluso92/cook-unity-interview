import { Injectable } from '@nestjs/common';

@Injectable()
export class FirestoreService {
  bd: FirebaseFirestore.Firestore;
}
