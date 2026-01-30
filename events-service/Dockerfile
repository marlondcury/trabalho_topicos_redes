# 1. Usa uma imagem base do Node.js (versão leve do Linux)
FROM node:18-alpine

# 2. Define a pasta de trabalho dentro do container
WORKDIR /usr/src/app

# 3. Copia os arquivos de dependência primeiro (para aproveitar cache)
COPY package*.json ./

# 4. Instala as dependências lá dentro
RUN npm install

# 5. Copia todo o resto do seu código para dentro
COPY . .

# 6. Expõe a porta que o serviço usa
EXPOSE 3001

# 7. O comando para ligar o servidor
CMD ["node", "index.js"]