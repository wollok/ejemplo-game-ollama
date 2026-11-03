import { Ollama } from 'ollama'

const client = new Ollama({ host: 'http://localhost:11434' })
const model = 'gemma4:latest'
let data
let error
let pending = false
let latestRequest = 0
let requestQueue = Promise.resolve()

const systemMessages = [
  { role: 'system', content: 'Sos un personaje de un videojuego. Los jugadores te van a hablar. Vas a recibir la convesación previa. Hacé respuestas cortas, de no más de 30 caracteres.' },
  { role: 'system', content: 'Además de la respuesta corta, dame 3 opciones de posibles de mensajes que te podrían hacer. Todo separado por \n' },
]
const conversation = []

const ollama = {
  *send(_self, wMessage) {
    const message = wMessage.innerString
    const request = ++latestRequest
    data = undefined
    error = undefined
    pending = true

    requestQueue = requestQueue.then(async () => {
      conversation.push({ role: 'user', content: message })
      const response = await client.chat({
        model,
        messages: [...systemMessages, ...conversation],
      })
      const answer = response.message.content
      conversation.push({ role: 'assistant', content: answer })

      if (request !== latestRequest) return
      data = answer
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
