FROM nginx:alpine

# Remove the default nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

# Replace with our own nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the generate-certs.sh and make it executable
COPY generate-certs.sh generate-certs.sh
RUN chmod +x generate-certs.sh

CMD ["nginx", "-g", "daemon off;"]
