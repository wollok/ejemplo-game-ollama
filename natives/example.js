import { Ollama } from 'ollama'

const client = new Ollama({ host: 'http://localhost:11434' })
const model = 'gemma4:latest'
let data
let error
let pending = false
let latestRequest = 0

const ollama = {
  *send(_self, wMessage) {
    const message = wMessage.innerString
    const request = ++latestRequest
    data = undefined
    error = undefined
    pending = true

    client.chat({
      model,
      messages: [
        { role: 'system', content: 'Sos un personaje de un videojuego. Los jugadores te van a hablar. Hacé respuestas cortas, de no más de 30 caracteres.' },
        { role: 'system', content: 'Además de la respuesta corta, dame 3 opciones de posibles preguntas que te podrían hacer. Todo separado por \n' },
        { role: 'user', content: message }
      ],
    }).then((response) => {
      if (request !== latestRequest) return
      data = response.message.content
      pending = false
    }).catch((requestError) => {
      if (request !== latestRequest) return
      error = requestError instanceof Error ? requestError.message : String(requestError)
      pending = false
    })
  },

  *response(_self) {
    // if (pending) return yield* this.reify('Esperando respuesta de Ollama...')
    // if (error) throw new Error(`Error al consultar Ollama: ${error}`)
    // if (data === undefined) {
    //   return yield* this.reify('Todavía no hay una respuesta. Enviá un mensaje primero.')
    // }
    if (pending || error || data === undefined) return yield* this.reify(null)
    return yield* this.reify(data)
  },
}

export { ollama }
