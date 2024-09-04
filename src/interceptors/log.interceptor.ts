import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const dt = Date.now()
    //next handle - chamar o nosso manipulador de rotas  
    // pipe - funcao de tubo
    //tp pegar o retorno o metodo, excecutar, passar pelo tubo e vai retornar 
    //o mesmo codigo
    return next.handle().pipe(tap(()=>{
      const request = context.switchToHttp().getRequest()
      console.log(`URL: ${request.url}`)
      console.log(`a execução levou: ${Date.now() - dt} milisegundos`)
    }))
  }
}