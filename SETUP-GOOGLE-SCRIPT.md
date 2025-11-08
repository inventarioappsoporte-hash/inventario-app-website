# Configuración Google Apps Script

## Pasos para configurar el formulario de contacto:

### 1. Crear el script
1. Ve a https://script.google.com
2. Crea un nuevo proyecto
3. Copia el código de `google-apps-script.js`
4. Pégalo en el editor

### 2. Configurar permisos
1. Guarda el proyecto
2. Ejecuta la función `doPost` una vez para autorizar permisos
3. Acepta los permisos de Gmail

### 3. Desplegar como Web App
1. Haz clic en "Desplegar" > "Nueva implementación"
2. Tipo: "Aplicación web"
3. Ejecutar como: "Yo"
4. Acceso: "Cualquier persona"
5. Copia la URL generada

### 4. Actualizar el código web
1. En `js/main.js`, línea 150
2. Reemplaza `AKfycbxYOUR_SCRIPT_ID` con tu URL real
3. Ejemplo: `https://script.google.com/macros/s/AKfycbxABC123.../exec`

### 5. Probar
- El formulario enviará emails a `infosoporteinventarioapp@gmail.com`
- Los emails incluirán toda la información del formulario
- Es completamente gratuito con límites generosos de Google

## Ventajas de Google Apps Script:
- ✅ Completamente gratuito
- ✅ Integración directa con Gmail
- ✅ Sin límites de formularios
- ✅ Fácil de configurar
- ✅ Confiable y seguro