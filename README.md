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
- Se quitan los filtros de las tablas en cada componente de fields admin, se agrega el atributo filter=false a la variable settings..
- Se agregan estilos de css para que los botones se vean separados.
- Se agrega al modelo sector la relación con la tabla especie debido al nuevo campo creado.
- Se crea el componente sectors-species para proporcionar una vista de los sectores pertenecientes a una especie.
- Se agrega una columna en gestión de sectores para que se vea a que especie pertenece. El editar y el agregar no estan operativos.


## Tareas en la instancia
- Se elimina todo desarrollo que no sea el correspondiente a esta prueba.
- Se clona el repositorio y se instalan las dependencias necesarias.
- Repositorio se encuentra en /var/www/CalGrow.
- Se mueve el directorio db y auth a la raíz del sistema.
- Se hace un build al frontEnd
- La app Angular se ejecuta en /var/www/CalGrow/web/web/dist
- Se terminan los servicios apache y se ocupa Nginx en el puerto 80.
- Se instala el servicio pm2 para que los servicios de backend corran en todo momento.


## Problemas
- No he podido configurar nginx, por lo que no puedo deployar en su totalidad la aplicación angular. (Solucionado)
- Existía un error (1055) en una query, debido a una configuración de mysql, se soluciona agregando una linea de configuración extra.

## Autor
- Javier Hermosilla Mallea