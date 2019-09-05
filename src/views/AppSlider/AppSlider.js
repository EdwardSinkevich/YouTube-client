import './AppSlider.css';
import AppClips from './AppClips/AppClips';
import AppButtons from './AppButtons/AppButtons';

export default class AppSlider {
  constructor(videoInfo) {
    this.videoInfo = videoInfo;
    this.slider = document.querySelector('.clips');
  }

  addFirstRequestClips() {
    const clips = new AppClips(this.videoInfo);
    const clipsArr = clips.generateClips();

    this.slider.style.setProperty('--clips-page', 0);
    this.slider.style.setProperty('--amount-clips', clipsArr.length);

    const controlBtns = new AppButtons();
    controlBtns.showStartBtns();

    if (this.slider.firstChild) {
      while (this.slider.firstChild) {
        this.slider.removeChild(this.slider.firstChild);
      }
    }
    clipsArr.forEach((clipItem) => {
      this.slider.appendChild(clipItem);
    });
    return this.slider;
  }

  addNextRequestClips() {
    let amountClips = parseInt(getComputedStyle(this.slider).getPropertyValue('--amount-clips'), 10);
    const clips = new AppClips(this.videoInfo);
    const clipsArr = clips.generateClips();

    amountClips += clipsArr.length;
    this.slider.style.setProperty('--amount-clips', amountClips);

    clipsArr.forEach((clipItem) => {
      this.slider.appendChild(clipItem);
    });
  }
}
