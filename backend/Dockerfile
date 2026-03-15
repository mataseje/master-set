FROM node:25-slim

COPY package*.json ./

RUN npm cache clean --force \
    && npm install --verbose

RUN apt-get update \
    && apt-get install -y \
        vim \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && echo 'set bell-style none' >> /etc/inputrc

# WORKDIR /app

COPY . .

CMD ["node", "./dist/app.js"]

# Development
# CMD ["sh", "-c", "tail -f /dev/null"]