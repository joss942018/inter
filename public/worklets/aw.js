class AWP extends AudioWorkletProcessor {
  constructor() {
    super();
    this.threshold = 0.01; // Umbral para detectar la voz (ajustable según tus necesidades)
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];

    let noise = [];
    for (let channel = 0; channel < input.length; ++channel) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];

      for (let i = 0; i < inputChannel.length; ++i) {
        const inputSample = inputChannel[i];

        // Calcula la magnitud de la muestra de entrada
        const magnitude = Math.abs(inputSample);

        // Aplica la supresión de ruido y resaltado de voz
        // const outputSample = 0;
        const outputSample = magnitude > this.threshold ? inputSample : 0;
        if (magnitude < this.threshold && magnitude > 0.005) {
          noise.push(inputSample);
        }
        // Guarda la muestra procesada en el búfer de salida
        outputChannel[i] = outputSample;
      }
    }
    this.port.postMessage({
      output: output[0],
      noise,
      channels: input.length,
    });
    return true;
  }
}

registerProcessor("audio-worklet-processor", AWP);
