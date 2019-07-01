'use strict'

import Operator from '../operator.js'

export default function OperatorPitchBend (orca, x, y) {
  Operator.call(this, orca, x, y, '¢', true)

  this.name = 'pitchbend'
  this.info = 'Sends MIDI pitchbend'

  this.ports.channel = { x: 1, y: 0, clamp: { min: 0, max: 15 } }
  this.ports.lsb = { x: 2, y: 0, clamp: { min: 0 } }
  this.ports.msb = { x: 3, y: 0, clamp: { min: 0 } }

  this.operation = function (force = false) {
    if (!this.hasNeighbor('*') && force === false) { return }
    if (this.listen(this.ports.channel) === '.') { return }
    if (this.listen(this.ports.lsb) === '.') { return }

    const channel = this.listen(this.ports.channel, true)
    const rawlsb = this.listen(this.ports.lsb, true)
    const lsb = Math.ceil((127 * rawlsb) / 35)
    const rawmsb = this.listen(this.ports.msb, true)
    const msb = Math.ceil((127 * rawmsb) / 35)

    this.draw = false
    terminal.io.pitchbend.send(channel, lsb, msb)

    if (force === true) {
      terminal.io.pitchbend.run()
    }
  }
}
