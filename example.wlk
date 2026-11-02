object wko {
  var property position = game.center()
  const property image = "wko.png"
  
  method sendToLlama(message) {
    
  }
}

class Opcion {
  var n
  const property mensaje
  var property position
  
  method initialize() {
    position = game.at(0, n * 3)
  }

  method text() = n.toString() + ' ' + mensaje
  
  method seleccionar() {
    game.say(wko, mensaje)
    ollama.send(mensaje)
  }
}

const opciones = [
  new Opcion(n = 1, mensaje = "Hola"),
  new Opcion(n = 2, mensaje = "Qué tal"),
  new Opcion(n = 3, mensaje = "Chau")
]

object ollama {
  var property position = game.origin()
  const property image = "llama.png"
  
  method send(message) native
  
  method response() native
  
  method flush() {
    const res = self.response()
    if (res != null) game.say(self, res)
  }
}