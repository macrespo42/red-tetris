FROM denoland/deno:2.4.4

WORKDIR /app

COPY package.json .

RUN deno install

COPY . .

ENV PORT 3000

EXPOSE 3000

RUN deno cache src/app.ts

CMD ["deno", "--allow-net", "--allow-env", "src/app.ts"]
