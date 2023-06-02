# Doppleganger/server/nginx/Dockerfile

FROM nginx:alpine

RUN apk add --no-cache openssl && mkdir -p /etc/nginx/certs
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY generate-certs.sh generate-certs.sh
RUN chmod +x generate-certs.sh && ./generate-certs.sh

CMD ["nginx", "-g", "daemon off;"]