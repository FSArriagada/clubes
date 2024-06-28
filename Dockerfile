# Usa una imagen base con Node.js
FROM node

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu aplicación al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto en el contenedor
EXPOSE 3000

# Comando para iniciar tu aplicación cuando se ejecute el contenedor
CMD ["node", "index.js"]
