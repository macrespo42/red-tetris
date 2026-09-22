FROM python:3.13-slim AS builder

WORKDIR /app

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/
COPY pyproject.toml uv.lock ./

RUN uv sync --locked --no-dev

COPY . .

FROM python:3.13-slim

WORKDIR /app

COPY --from=builder /app/.venv /app/.venv
COPY --from=builder /app /app

ENV PATH="/app/.venv/bin:$PATH"
ENV PORT=3000

RUN useradd -m appuser && \
    chown -R appuser:appuser /app

USER appuser

EXPOSE 3000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "3000"]