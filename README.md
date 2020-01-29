# CalGrow

## Antecedentes
- Se entrega una llave para acceder al servicio AWS para entender la instancia.
- Se menciona que hay que cambiar el método por el cual se agregan los campos, sectores, plantas y frutas. La idea es que sea un ingreso automatizado.

## Tareas Realizadas
- Se configura el entorno para trabajar de forma local la base de datos
- Se edita el componente y plantilla que se encargan de agregar un campo a la base de datos. En estos momentos el formulario permite ingresar el número de sectores, plantas y frutas de un campo en espécifico.
- Se modifica el archivo field.component.ts para que se generen automaticamente los sectores, plantas y frutas asociados.
- El nombre que se genera para los sectores son del tipo: NombreCampo-S+númeroSector.
- El nombre que se genera para las plantas son del tipo: NombreSector-P+númeroPlanta.
- El nombre que se genera para las frutas son del tipo: NombrePLanta-F+númeroFruta.
- Se Agregan validaciones en el formulario de ingreso de Campo.
- Se quitan los filtros de las tablas.
- Se agregan estilos de css para que los botones se vean separados.


## Tareas en la instancia
- Se clona el repositorio y se instalan las dependencias necesarias
- Repositorio se encuentra en /var/www/CalGrow
- Se hace un build al frontEnd
- La app Angular se ejecuta en /var/www/CalGrow/web/web/dist
- Se configura nginx en el puerto 3001, ya que apache corre en el 80.
- Se instala el servicio pm2 para que los servicios de backend corran en todo momento.


## Problemas
- No he podido configurar nginx, por lo que no puedo deployar en su totalidad la aplicación angular. (Solucionado)

## Autor
- Javier Hermosilla Mallea