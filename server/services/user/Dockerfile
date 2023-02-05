FROM node:latest
WORKDIR /users
COPY . .
RUN npm install --production
ENV PORT=4001
ENV NODE_ENV=production
EXPOSE 4001
CMD ["node", "app"]