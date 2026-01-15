import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const rpcError = exception.getError();

        if (
        typeof rpcError === 'object' &&
        'statusCode' in rpcError &&
        'message' in rpcError
        ) {
        const status = isNaN(+rpcError['statusCode'])
            ? HttpStatus.BAD_REQUEST
            : +rpcError['statusCode'];

        return response.status(status).json(rpcError);
        }

        response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: rpcError,
        });
    }
}