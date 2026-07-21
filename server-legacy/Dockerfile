FROM denoland/deno:2.4.4 AS builder
WORKDIR /app
ENV DENO_DIR=/deno-dir
COPY deno.lock ./
COPY . .
RUN deno install
RUN deno cache src/app.ts

FROM denoland/deno:2.4.4
WORKDIR /app
COPY --from=builder /app .
COPY --from=builder /deno-dir /deno-dir
ENV DENO_DIR=/deno-dir
ENV PORT=3000
RUN chown -R deno:deno /app /deno-dir
USER deno
EXPOSE 3000
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-sys", "src/app.ts"]