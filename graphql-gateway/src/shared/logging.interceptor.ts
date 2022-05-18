import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';
import { address } from 'ip';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
// import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  // constructor(
  //   @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  // ) {}
  private logger = new Logger();
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const {
      variableValues,
      fieldName,
      operation: { operation, name },
    } = ctx.getInfo();
    const handlerName = ctx.getClass().name;
    const ip = address();

    this.logger.verbose(
      `************** Graphgql-Gateway Service of IP: ${ip} **************`,
      handlerName,
    );
    this.logger.verbose(
      `Operation: ${operation} - OperationName: ${
        name ? name.value : 'NO_NAME'
      } - FieldName: ${fieldName} - Args: ${JSON.stringify(
        variableValues,
      )} - Handler: ${handlerName}`,
      handlerName,
    );

    // return next.handle();
    return next
      .handle()
      .pipe(
        tap((data) => this.logger.verbose(JSON.stringify(data), handlerName)),
      );
  }
}
