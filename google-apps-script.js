// Google Apps Script para manejar el formulario de contacto
// Copia este código en script.google.com

function doPost(e) {
  try {
    // Parsear los datos del formulario
    const data = JSON.parse(e.postData.contents);
    
    // Email de destino
    const emailDestino = 'infosoporteinventarioapp@gmail.com';
    
    // Crear el asunto del email
    const asunto = `[Inventario App] ${data.subject} - ${data.name}`;
    
    // Crear el cuerpo del email
    const cuerpo = `
Nuevo mensaje desde la página web de Inventario App

Nombre: ${data.name}
Email: ${data.email}
Asunto: ${data.subject}
Fecha: ${data.timestamp}

Mensaje:
${data.message}

---
Este mensaje fue enviado desde el formulario de contacto de inventarioapp.com
    `;
    
    // Enviar el email
    MailApp.sendEmail({
      to: emailDestino,
      subject: asunto,
      body: cuerpo,
      replyTo: data.email
    });
    
    // Respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Respuesta de error
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({message: 'Formulario de contacto activo'}))
    .setMimeType(ContentService.MimeType.JSON);
}