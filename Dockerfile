
FROM node:lts-alpine

# --- NETFREE CERT INTSALL ---
ADD https://netfree.link/dl/unix-ca.sh /home/netfree-unix-ca.sh 
RUN cat  /home/netfree-unix-ca.sh | sh
ENV NODE_EXTRA_CA_CERTS=/etc/ca-bundle.crt
ENV REQUESTS_CA_BUNDLE=/etc/ca-bundle.crt
ENV SSL_CERT_FILE=/etc/ca-bundle.crt
# --- END NETFREE CERT INTSALL ---

WORKDIR /app

COPY package*.json ./

RUN npm install

<<<<<<< HEAD
COPY . .


EXPOSE 5173
=======
EXPOSE 5173 
>>>>>>> 23a1e9ad7f19592734695d15eb927ba063a35d22

CMD [ "npm", "run","dev" ]