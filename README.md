# POC-MF-ANGULAR-REACT    SINGLE-SPA
MicroFront a partir del framemework Single-SPA

## Comenzando con mf-angular
Primero que todo el framework de single spa consiste en una estrcturacion de paquetes para importar modulos completos dendro de nuestro sistema
Se puede ejecutar tanto con NPM como con YARN
El siguiente comando instala de manera global el manejador de arqueotipo de Single-Spa
```
npm install --global create-single-spa

# or
yarn global add create-single-spa
```
Luego de instalado el manejador de arquetipos podemos ejecutar este manejador con el siguiente comando
```
create-single-spa
```
Alternativamente sin el manejador de arquetipo se pueden usar los siguientes comandos para crear un proyecto inicial
```
npm init single-spa

# or
npx create-single-spa

# or
yarn create single-spa
```
al ejecutar el comando como creacion de arquetipos que es lo recomendable por el proveedor de servicios nos pedira completar wizard de creacion de proyecto

![alt text](https://github.com/JesusGarcia9009/poc-frontend-angular-simplespa/blob/main/doc/create-mf-angular.PNG)

una vez tengamos la estrctura de carpeta del nuevo mf-layout estamos listos para hacer unos pequeños ajustes que el provehedor sigue trabajando en ellos con el fin de lograr la mayor estabilidad posible en el proceso

* 1 - En el componente principal de nuestra aplicacion angular tenemos el nombre `app-root` lo cual es incompatible con multiples aplicaciones de angular ya que el componente se deberia llamar en varias ocaciones, el selector se debieria renombrar en este caso vamos a llamarlo `mf-layout` ya que es el componente fundamental del proyecto 'mf-layout'
* 2 - En el modulo principal `app.module.ts` no esta declarado el `EmptyRouteComponent` de `empty-route.component.ts` lo cual se deberia agregar
```ts
declarations: [AppComponent, EmptyRouteComponent];
#y
providers: [{provide: APP_BASE_HREF, useValue: '/'}],
```
* 3 - En el archivo de routing hasta la version 10 de single SPA estaba generando mal el archivo por lo que habria que remplazarlo por el siguiente codigo
```ts
import { APP_BASE_HREF } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmptyRouteComponent } from "./empty-route/empty-route.component";

const routes: Routes = [{ path: "**", component: EmptyRouteComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }],
})
export class AppRoutingModule {}
```

### Conclusion
Despues de crear la aplicacion angular necesitamos crear la aplicacion de ruteo padre para registrar el mf creado en angular... ahora veamos como crear la shell de registro para el mf creado recientemente

## Comenzando con mf-shell o mf-routing
Luego de instalado el manejador de arquetipos podemos ejecutar este manejador con el siguiente comando
```
create-single-spa
```
ejecutando el comando vamos a tener que rellenar diferentes opciones para que al CLI pueda identificar que tipo de plantilla es la que necesita para crear la shell

![alt text](https://github.com/JesusGarcia9009/poc-frontend-angular-simplespa/blob/main/doc/create-mf-shell.PNG)

Lugo de generar la shell hay varios aspectos que habria que configurar para poder registrar el modulo que habiamos creado anteriormente el `mf-layout` en la shell para poder visualizar un mf dentro de otro

* 1 - Registrar el `mf-layout` en el archivo ``pipecorp-root-config.ts`` y quedaria de la siguiente forma
```ts
registerApplication({
  name: "@pipecorp/mf-layout",
  app: () => System.import("@pipecorp/mf-layout"),
  activeWhen: ["/"]
});
```
* 2 - Registrar el `mf-layout` importandolo desde la url donde va a estar publicado en el archivo ``index.ejs`` y quedaria de la siguiente forma
```js
      "imports": {
        "@pipecorp/pipecorp-root-config": "//localhost:9000/pipecorp-root-config.js",
        "@pipecorp/mf-layout": "//localhost:3000/main.js"
      }
```
ademas hay que descomentar el `zone.js` para la ejecucion correcta de angular
```js
 <!--
    If you need to support Angular applications, uncomment the script tag below to ensure only one instance of ZoneJS is loaded
    Learn more about why at https://single-spa.js.org/docs/ecosystem-angular/#zonejs
  -->
  <script src="https://cdn.jsdelivr.net/npm/zone.js@0.11.3/dist/zone.min.js"></script>
```
