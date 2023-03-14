import * as express from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { FirestoreService } from './app/bd/firestore/firestore.service';

admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    project_id: 'cook-unity-api',
    private_key_id: '4b01d8f392fc7739bd384dd77479631176d99292',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDqe3r6JF6eb31G\ne2mgsUWQhkJT/Jb8/0Cj7kGAHNop3khgwAIN8W8Uv4KJorZGgn4GMWTz0EH+9KcB\n5pola0uNd8G8fKQazWkuf65ktY0LpfRuMzj9qRJ4P2u3SL20oEfudGi/CYegstUd\nMn/a7UAQtm1JpjzkYtdBH44RQLsEiZP9Nep6NPHskxDTZoU4k2ey0J8ZkCerEOlS\nVCDx70Vn7+NhY4dG54SJertGEA8+hkQSdD6GlfG/zipGfRny3gcolFnSV0zSnpbM\nfjBGNTkNYvKAondm+UKpfxDhu6z6ilhGQcZ1FZiPeVsLXZ0jVhKtiEP3nPrOIp1M\nIJ6YBxtTAgMBAAECggEAYCTxb8+p3FzqiRPhY7pMQ85JNBbF8kbXQmBXCyjJa5Fx\nK/qO3Ri560/7PmQxSQgIlJF8S1yBMwEt2WGsotszx3XrQlX5E+RV1HMWFsU6aCRL\n7UOjgp7oq9WVXTm+T2nJFMU2jd5idkndiHNEaYgOVMv4U9KN9Tdx+4nsvrZD+L+H\ntd9BqtEjs+s+xdRqLn/Pp/dOrtaxjdRm1JeLcb/8cIafNmSs3JhnOW3zXXfS+J9l\n4eBM1J977RASmhHoNYt6k4OwIhE7tyhEs+Nmb29NQ79PHZR9qGj5tg+hR4ATLRdT\nBSHljbZV1KaoB/a/sjFfFGbLQFYD23852gJ2rMDDAQKBgQD4eOzQVYDrL1o5kTRv\n70iFt78dN8H5qPK7rY2G7S0rIgRQ0XCcTroy83tSFj8QdN1dM+CCOIyaF0uDNcpH\nb1oVZT9TXpVcGzPO3mS1YqKayUbvPQWDpmY3JSV3XlkH4kvo/DbcSjJxuuf91Foz\n0IFWo8DhmuQ4UTXHmMcb5aGs4wKBgQDxlg2Vg0HMAb9oW7JZi6e6Wh223iwSEjfk\n2cJo2Ui2WlDwQbeXzwxIMbpkbdLR+FsaOZfJhN5t3oHkxwid2wyX6tO7odqAhuhX\n7u/Yc6McmTIp24w7CoOhNXTj59JFjOcEZVs3wZmSfbfiJM9cbz+SwHtnLAJq+xrR\nCjEI6msS0QKBgQDYwv2tHfqSscOfVvqM8A2vgcX7IkpZl7byXYyK+dwetdVX/+6i\nnde4XUrnKLspixoWlgw07kpSnyHkPIfT2+OVqLce7vOT37NJtB/dUUgTiqYUTYLC\n/+ZKE2DlCuzWgOfCQE1Hzn7FUs3SVW+/phU/VSoOZsbUDpzBHJoOzzxFCwKBgBJ/\nZMbf5/fQ4nEBJGTK1qrkH4ZS+JjhoDn7mnEgwfqEa9IZlg8foVcdx6HM7ul41LDr\nW/3oGIfdE6EKxFQh45L2PgQN3occzUl+WAsAv6p+6GJgFxqmMXH0f+C7bVQ5965U\nfGmGf1XCHoRIQUBYnEuGRWye6Ah89Y6v8xU1rcEhAoGBANUcWSxJmn0lQ05p1PAs\nLwH11607CfU08Vc8fxnDJ5hzO0EYAEvjJiVv2iaSTgDVin8Hkuo7lSZ3KaKepuGI\ndd0sCfq2YY0FMrewUUPvhnLnyggUbiRKezjHPZA6M0MX1XHEI4xrUXryO8DiGbpH\n5H6D3XGANiRUgZod7/dgvZVL\n-----END PRIVATE KEY-----\n',
    client_email:
      'firebase-adminsdk-zlf19@cook-unity-api.iam.gserviceaccount.com',
    client_id: '115826378509473577820',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zlf19%40cook-unity-api.iam.gserviceaccount.com',
  } as unknown),
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
