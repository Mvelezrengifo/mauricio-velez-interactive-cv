// SoundGenerator Híbrido - Soporta archivos de audio y generación por código
// Coloca tus archivos en: /public/sounds/

export class SoundGenerator {
  private audioContext: AudioContext | null = null;
  private ambientOscillators: OscillatorNode[] = [];
  private ambientNoise: AudioBufferSourceNode | null = null;
  private masterGain: GainNode | null = null;
  private isActive = false;
  private lfoNode: OscillatorNode | null = null;

  // Cache para archivos de audio cargados
  private audioBuffers: Map<string, AudioBuffer> = new Map();

  // Ambient music element (para música de fondo en loop)
  private ambientAudio: HTMLAudioElement | null = null;

  // Configuración de sonidos - puedes cambiar los nombres de archivos aquí
  private soundFiles = {
    ambient: '/sounds/ambient-space.mp3',      // Música ambiental de fondo
    transition: '/sounds/transition.mp3',       // Sonido de transición entre secciones
    projectAppear: '/sounds/project-appear.mp3', // Sonido cuando aparece un proyecto
    click: '/sounds/click.mp3',                 // Sonido de click
    chat: '/sounds/chat.mp3',                   // Sonido cuando llega mensaje del chat
  };

  // Si usar archivos (true) o generación por código (false)
  private useFiles = {
    ambient: true,
    transition: true,
    projectAppear: true,
    click: false,
    chat: false,
  };

  init() {
    console.log("SoundGenerator preparado - Modo Híbrido (Archivos + Código)");
  }

  private ensureAudioContext(): boolean {
    if (this.audioContext) return true;

    try {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return false;

      this.audioContext = new AudioContextClass();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = 0.3;
      return true;
    } catch (e) {
      console.error("Error inicializando AudioContext:", e);
      return false;
    }
  }

  // Cargar un archivo de audio
  private async loadAudioFile(url: string): Promise<AudioBuffer | null> {
    if (this.audioBuffers.has(url)) {
      return this.audioBuffers.get(url) || null;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`Archivo no encontrado: ${url}`);
        return null;
      }

      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);
      this.audioBuffers.set(url, audioBuffer);
      return audioBuffer;
    } catch (e) {
      console.warn(`Error cargando ${url}:`, e);
      return null;
    }
  }

  // Reproducir un buffer de audio
  private playBuffer(buffer: AudioBuffer, volume: number = 0.5, loop: boolean = false): AudioBufferSourceNode | null {
    if (!this.audioContext || !this.masterGain) return null;

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();

    source.buffer = buffer;
    source.loop = loop;
    gainNode.gain.value = volume;

    source.connect(gainNode);
    gainNode.connect(this.masterGain);
    source.start();

    return source;
  }

  // Crear ruido blanco/rosa para textura
  private createNoiseBuffer(duration: number, color: 'white' | 'pink' = 'pink'): AudioBuffer {
    const sampleRate = this.audioContext!.sampleRate;
    const length = sampleRate * duration;
    const buffer = this.audioContext!.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);

    if (color === 'white') {
      for (let i = 0; i < length; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    } else {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < length; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    }
    return buffer;
  }

  // ========== SONIDO AMBIENTAL ==========

  async playAmbient() {
    if (!this.ensureAudioContext() || !this.masterGain || !this.isActive) return;

    // Intentar usar archivo de audio primero
    if (this.useFiles.ambient) {
      const buffer = await this.loadAudioFile(this.soundFiles.ambient);
      if (buffer) {
        console.log("🎵 Usando música ambiental desde archivo");
        const source = this.playBuffer(buffer, 0.4, true);
        if (source) {
          this.ambientNoise = source;
          return;
        }
      }
    }

    // Fallback: generar sonido por código
    console.log("🎵 Usando sonido ambiental generado por código");
    this.playAmbientGenerated();
  }

  // Sonido ambiente generado por código - "Hum" tecnológico
  private playAmbientGenerated() {
    if (!this.audioContext || !this.masterGain) return;

    const ctx = this.audioContext;
    const baseFrequencies = [55, 82.5, 110, 165];
    const gains = [0.08, 0.05, 0.04, 0.03];

    baseFrequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.value = freq;

      filter.type = 'lowpass';
      filter.frequency.value = 200;
      filter.Q.value = 1;

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.1 + (i * 0.05);
      lfoGain.gain.value = 2;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);
      gain.gain.value = gains[i];

      osc.start();
      this.ambientOscillators.push(osc);
    });

    // Ruido de fondo filtrado
    const noiseBuffer = this.createNoiseBuffer(30, 'pink');
    this.ambientNoise = ctx.createBufferSource();
    this.ambientNoise.buffer = noiseBuffer;
    this.ambientNoise.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 150;
    noiseFilter.Q.value = 0.5;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.02;

    this.ambientNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain!);
    this.ambientNoise.start();
  }

  // ========== SONIDO DE TRANSICIÓN ==========

  async playSectionChange() {
    if (!this.ensureAudioContext() || !this.masterGain || !this.isActive) return;

    // Intentar usar archivo de audio primero
    if (this.useFiles.transition) {
      const buffer = await this.loadAudioFile(this.soundFiles.transition);
      if (buffer) {
        this.playBuffer(buffer, 0.5, false);
        return;
      }
    }

    // Fallback: generar sonido por código
    this.playSectionChangeGenerated();
  }

  // Sonido de transición generado por código
  private playSectionChangeGenerated() {
    if (!this.audioContext || !this.masterGain) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    // 1. Whoosh principal
    const whooshOsc = ctx.createOscillator();
    const whooshGain = ctx.createGain();
    const whooshFilter = ctx.createBiquadFilter();

    whooshOsc.type = 'sawtooth';
    whooshFilter.type = 'lowpass';

    whooshOsc.frequency.setValueAtTime(1200, now);
    whooshOsc.frequency.exponentialRampToValueAtTime(80, now + 0.6);

    whooshFilter.frequency.setValueAtTime(3000, now);
    whooshFilter.frequency.exponentialRampToValueAtTime(200, now + 0.5);
    whooshFilter.Q.value = 5;

    whooshGain.gain.setValueAtTime(0.2, now);
    whooshGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    whooshOsc.connect(whooshFilter);
    whooshFilter.connect(whooshGain);
    whooshGain.connect(this.masterGain!);

    whooshOsc.start(now);
    whooshOsc.stop(now + 0.6);

    // 2. Chispas eléctricas
    const sparkFreqs = [2400, 3200, 4800];
    sparkFreqs.forEach((freq, i) => {
      const spark = ctx.createOscillator();
      const sparkGain = ctx.createGain();

      spark.type = 'sine';
      spark.frequency.value = freq + (Math.random() * 200 - 100);

      sparkGain.gain.setValueAtTime(0, now + 0.05 * i);
      sparkGain.gain.linearRampToValueAtTime(0.05, now + 0.05 * i + 0.02);
      sparkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2 + 0.05 * i);

      spark.connect(sparkGain);
      sparkGain.connect(this.masterGain!);

      spark.start(now + 0.05 * i);
      spark.stop(now + 0.3);
    });

    // 3. Ruido de "energía"
    const noiseBuffer = this.createNoiseBuffer(0.5, 'white');
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(2000, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(500, now + 0.3);
    noiseFilter.Q.value = 2;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.08, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain!);

    noiseSource.start(now);
    noiseSource.stop(now + 0.5);

    // 4. Tono de confirmación
    const confirmOsc = ctx.createOscillator();
    const confirmGain = ctx.createGain();

    confirmOsc.type = 'triangle';
    confirmOsc.frequency.setValueAtTime(880, now + 0.15);
    confirmOsc.frequency.setValueAtTime(1100, now + 0.2);

    confirmGain.gain.setValueAtTime(0, now + 0.15);
    confirmGain.gain.linearRampToValueAtTime(0.1, now + 0.18);
    confirmGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    confirmOsc.connect(confirmGain);
    confirmGain.connect(this.masterGain!);

    confirmOsc.start(now + 0.15);
    confirmOsc.stop(now + 0.5);
  }

  // ========== SONIDO DE PROYECTO APARECE ==========

  async playProjectAppear() {
    if (!this.ensureAudioContext() || !this.masterGain || !this.isActive) return;

    // Intentar usar archivo de audio primero
    if (this.useFiles.projectAppear) {
      const buffer = await this.loadAudioFile(this.soundFiles.projectAppear);
      if (buffer) {
        this.playBuffer(buffer, 0.4, false);
        return;
      }
    }

    // Fallback: generar sonido por código
    this.playProjectAppearGenerated();
  }

  // Sonido de proyecto apareciendo generado por código
  private playProjectAppearGenerated() {
    if (!this.audioContext || !this.masterGain) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    // Arpegio ascendente tecnológico
    const notes = [220, 330, 440, 550, 660];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      const startTime = now + i * 0.05;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.08, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });

    // Brillo de fondo
    const shimmer = ctx.createOscillator();
    const shimmerGain = ctx.createGain();

    shimmer.type = 'sine';
    shimmer.frequency.value = 1760;

    shimmerGain.gain.setValueAtTime(0.02, now);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    shimmer.connect(shimmerGain);
    shimmerGain.connect(this.masterGain!);

    shimmer.start();
    shimmer.stop(now + 0.8);
  }

  // ========== SONIDO DE CLICK ==========

  async playClick() {
    if (!this.ensureAudioContext() || !this.masterGain || !this.isActive) return;

    if (this.useFiles.click) {
      const buffer = await this.loadAudioFile(this.soundFiles.click);
      if (buffer) {
        this.playBuffer(buffer, 0.3, false);
        return;
      }
    }

    // Fallback simple
    if (!this.audioContext) return;
    const ctx = this.audioContext;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 800;

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.masterGain!);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // ========== SONIDO DE CHAT ==========

  async playChat() {
    if (!this.ensureAudioContext() || !this.masterGain || !this.isActive) return;

    if (this.useFiles.chat) {
      const buffer = await this.loadAudioFile(this.soundFiles.chat);
      if (buffer) {
        this.playBuffer(buffer, 0.3, false);
        return;
      }
    }

    // Fallback: tono suave de notificación
    if (!this.audioContext) return;
    const ctx = this.audioContext;
    const now = ctx.currentTime;

    [600, 800].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      const startTime = now + i * 0.1;
      gain.gain.setValueAtTime(0.05, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  }

  // ========== CONTROL GENERAL ==========

  start() {
    this.isActive = true;
    if (this.ensureAudioContext()) {
      if (this.audioContext!.state === 'suspended') {
        this.audioContext!.resume();
      }
      this.playAmbient();
    }
  }

  stop() {
    this.isActive = false;

    // Detener todos los osciladores de ambiente
    this.ambientOscillators.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    this.ambientOscillators = [];

    // Detener el ruido de fondo
    if (this.ambientNoise) {
      try { this.ambientNoise.stop(); } catch (e) {}
      this.ambientNoise = null;
    }

    // Detener LFO
    if (this.lfoNode) {
      try { this.lfoNode.stop(); } catch (e) {}
      this.lfoNode = null;
    }
  }

  setVolume(value: number) {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, value));
    }
  }

  // Configurar qué sonidos usar archivos vs código
  setUseFiles(config: Partial<typeof this.useFiles>) {
    Object.assign(this.useFiles, config);
  }

  // Configurar nombres de archivos
  setSoundFiles(files: Partial<typeof this.soundFiles>) {
    Object.assign(this.soundFiles, files);
  }
}

// Instancia singleton
export const soundGenerator = new SoundGenerator();
