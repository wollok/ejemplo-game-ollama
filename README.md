

# Pixel Art

Herramienta de pixel art hecha con Wollok Game. El tablero mide 500 × 500
píxeles y está formado por 50 × 50 celdas de 10 × 10 píxeles.

- Hacé clic en una celda para alternarla entre blanco y negro.
- Presioná **C** para limpiar el tablero.

Ejecutá `mainExample.wpgm` desde Wollok para iniciar el juego.

## Ollama local

La nativa `ollama` envía mensajes al servidor local (`http://localhost:11434`)
usando el modelo `gemma4:latest`. Desde Wollok:

```wollok
ollama.send("Hola, ¿cómo estás?")
ollama.response()
```

La generación es asíncrona: `response()` devuelve un mensaje de espera mientras
Ollama procesa la consulta. Volvé a llamarlo para obtener la respuesta. Si el
pedido falla, la nativa informa el error al consultar `response()`.
