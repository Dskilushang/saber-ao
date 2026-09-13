import { Audio } from 'expo-av';

class SoundManager {
  constructor() {
    this.sounds = {};
    this.bgMusic = null;
    this.enabled = true;
    this.musicEnabled = true;
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;

    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });

      this.initialized = true;
    } catch (error) {
      console.warn('SoundManager init:', error);
    }
  }

  async loadAll() {
    await this.init();
  }

  async play(name) {
    if (!this.enabled) return;

    try {
      const sound = this.sounds[name];

      if (!sound) {
        return;
      }

      await sound.replayAsync();
    } catch (error) {
      console.warn(`SoundManager play(${name}):`, error);
    }
  }

  async playBgMusic() {
    if (!this.enabled || !this.musicEnabled) return;

    try {
      // La musique de fond sera ajoutée avec le nouveau pack audio.
      return;
    } catch (error) {
      console.warn('SoundManager background music:', error);
    }
  }

  async stopBgMusic() {
    try {
      if (this.bgMusic) {
        await this.bgMusic.stopAsync();
        await this.bgMusic.unloadAsync();
        this.bgMusic = null;
      }
    } catch (error) {
      console.warn('SoundManager stopBgMusic:', error);
    }
  }

  async playIntro() {
    return this.play('intro');
  }

  async onCorrect() {
    return this.play('correct');
  }

  async onWrong() {
    return this.play('wrong');
  }

  async onVictory() {
    return this.play('victory');
  }

  async onGameOver() {
    return this.play('gameOver');
  }

  async onClick() {
    // Important : cette fonction doit toujours se terminer
    // pour permettre à CategoriesScreen de naviguer vers Quiz.
    return this.play('click');
  }

  async onJoker() {
    return this.play('joker');
  }

  setEnabled(enabled) {
    this.enabled = enabled;

    if (!enabled) {
      this.stopBgMusic();
    }
  }

  setMusicEnabled(enabled) {
    this.musicEnabled = enabled;

    if (!enabled) {
      this.stopBgMusic();
    } else {
      this.playBgMusic();
    }
  }

  async unloadAll() {
    try {
      await this.stopBgMusic();

      for (const key of Object.keys(this.sounds)) {
        try {
          await this.sounds[key].unloadAsync();
        } catch (error) {
          console.warn(`SoundManager unload(${key}):`, error);
        }
      }

      this.sounds = {};
      this.initialized = false;
    } catch (error) {
      console.warn('SoundManager unloadAll:', error);
    }
  }
}

export default new SoundManager();
