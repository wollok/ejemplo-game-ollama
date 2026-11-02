object wko {
  var property position = game.center()
  const property image = "wko.png"
}

object ollama {
  var property position = game.origin()
  const property image = "llama.png"

  method send(message) native
  method response() native

  method flush() {
    const res = self.response()
    if (res != null) {
      game.say(self, res)
    }
  }
}