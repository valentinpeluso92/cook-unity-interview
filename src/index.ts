import * as express from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { FirestoreService } from './app/bd/firestore/firestore.service';

import * as cert from './certificates/cook-unity-api-firebase-adminsdk-zlf19-47922abf15.json';

admin.initializeApp({
  credential: admin.credential.cert(cert as admin.ServiceAccount),
});

const bd = admin.firestore();

const expressServer = express();

const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
    {
      logger: false,
    },
  );

  const firestoreService = app.get<FirestoreService>(FirestoreService);
  firestoreService.bd = bd;

  await app.init();
};

const corsWithOrigin = cors({ origin: true });

export const api = functions.https.onRequest((request, response) => {
  corsWithOrigin(request, response, async () => {
    await createFunction(expressServer);
    expressServer(request, response);
  });
});
