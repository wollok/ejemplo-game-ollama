object wko {
  var property position = game.center()
  const property image = "pepita.png"
}

class Opcion {
  var n
  var property mensaje
  
  method position() = game.at(3, n * 3)
  
  method text() = (n.toString() + " ") + mensaje
  
  method seleccionar() {
    game.say(wko, mensaje)
    ollama.send(mensaje)
  }
}

const opciones = [
  new Opcion(n = 1, mensaje = "Hola"),
  new Opcion(n = 2, mensaje = "Qué tal?"),
  new Opcion(n = 3, mensaje = "Chau")
]

object ollama {
  var property position = game.origin()
  const property image = "llama.png"
  
  method send(message) native
  method debug(message) native
  
  method response() native
  
  method flush() {
    const res = self.response()
    if (res != null) {
      const respuesta = res.split("\n").filter({text => not text.isEmpty()})

      console.println(respuesta)
      game.say(self, respuesta.get(0))
      
      if (respuesta.size() >= 2) opciones.get(0).mensaje(respuesta.get(1))
      if (respuesta.size() >= 3) opciones.get(1).mensaje(respuesta.get(2))
      if (respuesta.size() >= 4) opciones.get(2).mensaje(respuesta.get(3))
    }
  }
}