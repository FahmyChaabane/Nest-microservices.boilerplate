useful research links :

- RpcExceptions are not logged : https://github.com/nestjs/nest/issues/303
- since RpcExeptions are not instances of HttpExceptions, a Internal Server Input is always thrown (doc of Exceptions Filters).
- kinda map observable into promise : https://stackoverflow.com/questions/71327273/issue-returning-values-with-rxjs-and-nestjs
- dynamic module : https://stackoverflow.com/questions/54535867/is-there-a-way-to-use-configservice-in-app-module-ts
- bug i have encountered (//GDM5), most probably when firstValueFrom arg is null: https://stackoverflow.com/questions/71607700/error-exceptionshandler-no-elements-in-sequence-after-upgrading-to-nestjs-v8-a
- hiding pwd after json serialization : https://stackoverflow.com/questions/54328563/serialization-how-to-exclude-entity-columns-in-json-response-but-not-internal-q
