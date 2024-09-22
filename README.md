"# gestor-frontend" 

-- Pasos para ejecutar aplicación de manera local --

1. Tener previamente instalado Node.js con su versión 18.13.0 y npm con su versión 9.7.1 antes de empezar con los demás pasos.

2. Compilar, solamente si no se ha hecho con anterioridad, con el comando npm install para que genere el directorio node_modules.

3. Apuntar el URL de la clase Services.ts a 'http://localhost:8082' ya que es donde deberá estar corriendo la aplicación backend localmente.

4. Para iniciar la aplicación se utilizará el comando "ng serve --host 0.0.0.0 --port 4201 --disable-host-check" para que se pueda,
abrir en distintos dispositivos, tomar en cuenta que el puerto 4200 debe estar disponible.
