# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho no container
WORKDIR /workspace

# Copie arquivos de configuração do projeto
COPY package.json package-lock.json* ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Configuração para o hot reloading funcionar corretamente
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true
ENV WDS_SOCKET_PORT=0

# Expose a porta 3000 para acessar a aplicação em desenvolvimento
EXPOSE 3000

# Inicie o servidor de desenvolvimento
CMD ["npm", "start"]