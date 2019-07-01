'use strict'

export default function MidiPitchBend (terminal) {
  this.stack = []
  this.offset = 64

  this.start = function () {
    console.info('MidiPitchBend', 'Starting..')
  }

  this.clear = function () {
    this.stack = []
  }

  this.run = function () {
    for (const id in this.stack) {
      this.play(this.stack[id])
    }
  }

  this.send = function (channel, lsb, msb) {
    this.stack.push([channel, lsb, msb])
  }

  this.setOffset = function (offset) {
    if (isNaN(offset)) { return }
    this.offset = offset
    console.log('MidiPitchBend', 'Set offset to ' + this.offset)
  }

  this.play = function (data) {
    const device = terminal.io.midi.outputDevice()
    if (!device) { console.warn('MidiPitchBend', `No Midi device.`); return }
    device.send([0xe0 + data[0], data[1], data[2]])
  }
}
