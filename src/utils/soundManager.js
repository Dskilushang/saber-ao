import { Audio } from 'expo-av';

const SOUND_FILES = {
  intro:     require('../../assets/sounds/intro.mp3'),
  bgMusic:   require('../../assets/sounds/bg_music.mp3'),
  correct:   require('../../assets/sounds/correct.mp3'),
  wrong:     require('../../assets/sounds/wrong.mp3'),
  victory:   require('../../assets/sounds/victory.mp3'),
  gameover:  require('../../assets/sounds/gameover.mp3'),
  click:     require('../../assets/sounds/click.mp3'),
  joker:     require('../../assets/sounds/joker.mp3'),
  countdown: require('../../assets/sounds/countdown.mp3'),
};

class SoundManager {
  constructor() {
    this.sounds = {};
    this.bgSound = null;
    this.enabled = true;
    this.musicEnabled = true;
  }

  async init() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
      });
    } catch (e) {
      console.warn('SoundManager init error:', e);
    }
  }

  async loadAll() {
    for (const [key, file] of Object.entries(SOUND_FILES)) {
      try {
        const { sound } = await Audio.Sound.createAsync(file);
        this.sounds[key] = sound;
      } catch (e) {
        console.warn(`Son introuvable: ${key}`, e);
      }
    }
  }

  async play(name, options = {}) {
    if (!this.enabled) return;
    try {
      const sound = this.sounds[name];
      if (!sound) return;
      await sound.setPositionAsync(0);
      await sound.setVolumeAsync(options.volume || 1.0);
      await sound.playAsync();
    } catch (e) {}
  }

  async playBgMusic() {
    if (!this.musicEnabled) return;
    try {
      const sound = this.sounds['bgMusic'];
      if (!sound) return;
      await sound.setIsLoopingAsync(true);
      await sound.setVolumeAsync(0.3);
      await sound.playAsync();
      this.bgSound = sound;
    } catch (e) {}
  }

  async stopBgMusic() {
    try {
      if (this.bgSound) await this.bgSound.stopAsync();
    } catch (e) {}
  }

  async playIntro()  { await this.play('intro'); }
  async onCorrect()  { await this.play('correct'); }
  async onWrong()    { await this.play('wrong'); }
  async onVictory()  { await this.play('victory'); }
  async onGameOver() { await this.play('gameover'); }
  async onClick()    { await this.play('click'); }
  async onJoker()    { await this.play('joker'); }

  setEnabled(val)      { this.enabled = val; }
  setMusicEnabled(val) {
    this.musicEnabled = val;
    if (!val) this.stopBgMusic();
  }

  async unloadAll() {
    for (const sound of Object.values(this.sounds)) {
      try { await sound.unloadAsync(); } catch (e) {}
    }
    this.sounds = {};
  }
}

export default new SoundManager();
