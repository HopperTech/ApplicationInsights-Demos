import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class ApplicationInsightsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;
    let succeeded: boolean;
    let id: string;
    let statusCode: number;

    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            succeeded = true;
            ok = 'succeeded';
            id = event.headers.get('operationId');
            statusCode = event.status;
          } else {
            ok = '';
          }
        },
        error => {
          succeeded = false;

          ok = 'failed';
          if (error instanceof HttpErrorResponse) {
            statusCode = error.status;
          }
        }
      ),
      finalize(() => {
        const elapsed = Date.now() - started;
      })
    );
  }
}
