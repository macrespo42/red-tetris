FROM python:3.14-slim

RUN groupadd -r appuser && useradd -r -g appuser -d /app appuser

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/
WORKDIR /app
COPY uv.lock pyproject.toml /app/
RUN uv sync

COPY . /app/

RUN chown -R appuser:appuser /app
USER appuser

ENV ENVIRONMENT=dev

CMD ["uv", "run", "fastapi", "${ENVIRONMENT}"]