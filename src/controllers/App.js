import AppModel from '../models/AppModel';
import AppStartPage from '../views/AppStartPage/AppStartPage';
import AppSlider from '../views/AppSlider/AppSlider';
import AppControlBtns from './AppControlBtns';
import AppResizeController from './AppResizeController';

window.clipsLoading = false;

export default class App {
  constructor() {
    this.searchApi = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBNvSu2heQzLIGA2dB0NMgG-alWk4gvJYU&type=video&part=snippet&maxResults=15&q=';
    this.request = null;
    this.switcher = true;
    this.videoInfo = null;
    this.slider = null;
    this.x0 = null;
    this.locked = false;
    this.widthInner = null;
  }

  unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e;
  }

  lock(e) {
    this.x0 = this.unify(e).clientX;
    this.slider.classList.toggle('smooth', !(this.locked = true));
  }

  drag(e) {
    if (this.locked) {
      this.slider.style.setProperty('--tweakX', `${Math.round(this.unify(e).clientX - this.x0)}px`);
    }
  }

  size() {
    this.widthInner = window.innerWidth;
  }

  async move(e) {
    if (this.locked) {
      const diffBetween = this.unify(e).clientX - this.x0;
      const sign = Math.sign(diffBetween);
      let dragDistance = +(sign * diffBetween / this.widthInner).toFixed(2);

      let pageNum = parseInt(getComputedStyle(this.slider).getPropertyValue('--clips-page'), 10);
      const clipsOnPage = parseInt(getComputedStyle(this.slider).getPropertyValue('--clips-on-page'), 10);
      let amountClips = parseInt(getComputedStyle(this.slider).getPropertyValue('--amount-clips'), 10);

      if ((pageNum > 0 || sign < 0)
      && (pageNum < (amountClips / clipsOnPage) - 1 || sign > 0)
      && dragDistance > 0.2) {
        this.slider.style.setProperty('--clips-page', pageNum -= sign);
        dragDistance = 1 - dragDistance;
      }
      this.slider.style.setProperty('--tweakX', '0px');
      this.slider.style.setProperty('--drag-istance', dragDistance);
      this.slider.classList.toggle('smooth', !(this.locked = false));

      const controlBtns = new AppControlBtns(this.slider);
      controlBtns.updateCurrentBtn(pageNum);
      controlBtns.displayPrev();
      controlBtns.displayNext();

      this.x0 = null;

      if (window.clipsLoading) {
        return;
      }
      if (amountClips >= 15 && !window.clipsLoading
      && (pageNum + clipsOnPage) * clipsOnPage >= amountClips) {
        this.loadNextClips(this.videoInfo).then(() => {
          window.clipsLoading = false;
        });
        amountClips = parseInt(getComputedStyle(this.slider).getPropertyValue('--amount-clips'), 10);
      }
    }
  }

  loadNextClipsByClick() {
    const pageNum = parseInt(getComputedStyle(this.slider).getPropertyValue('--clips-page'), 10);
    const clipsOnPage = parseInt(getComputedStyle(this.slider).getPropertyValue('--clips-on-page'), 10);
    let amountClips = parseInt(getComputedStyle(this.slider).getPropertyValue('--amount-clips'), 10);

    if (amountClips >= 15 && !window.clipsLoading
      && (Math.floor(amountClips / clipsOnPage) - pageNum === 2)) {
      this.loadNextClips(this.videoInfo).then(() => {
        window.clipsLoading = false;
      });
      amountClips = parseInt(getComputedStyle(this.slider).getPropertyValue('--amount-clips'), 10);
    }
  }

  async loadNextClips(prevVideoInfo) {
    if (prevVideoInfo.nextPageToken) {
      window.clipsLoading = true;
      const request = `${this.request}&pageToken=${prevVideoInfo.nextPageToken}`;

      const model = new AppModel(request);

      this.videoInfo = await model.extractVideoInfo();

      const view = new AppSlider(this.videoInfo);
      view.addNextRequestClips();
    }
  }

  createSlider(videoInfo) {
    const view = new AppSlider(videoInfo);
    this.slider = view.addFirstRequestClips();

    const clipsOnPage = parseInt(getComputedStyle(this.slider).getPropertyValue('--clips-on-page'), 10);

    const resizeController = new AppResizeController(this.slider, clipsOnPage);
    resizeController.addResizeController();

    const controlBtns = new AppControlBtns(this.slider);
    controlBtns.addSliderPagination();

    const loadByClick = this.loadNextClipsByClick.bind(this);
    controlBtns.btns.nextPage.addEventListener('click', loadByClick, false);

    this.size();
    const sizeContext = this.size.bind(this);
    window.addEventListener('resize', sizeContext, false);

    const lock = this.lock.bind(this);
    this.slider.addEventListener('mousedown', lock, false);
    this.slider.addEventListener('touchstart', lock, { passive: true });

    const drag = this.drag.bind(this);
    this.slider.addEventListener('mousemove', drag, false);
    this.slider.addEventListener('touchmove', drag, { passive: true });

    const move = this.move.bind(this);
    this.slider.addEventListener('mouseup', move, false);
    this.slider.addEventListener('touchend', move, { passive: true });
  }

  async firstStartView(request) {
    const model = new AppModel(request);
    this.videoInfo = await model.extractVideoInfo();

    this.createSlider(this.videoInfo);
  }

  async nextStartView(request) {
    const model = new AppModel(request);
    this.videoInfo = await model.extractVideoInfo();

    const view = new AppSlider(this.videoInfo);
    view.addFirstRequestClips();
  }

  search(requestValue) {
    window.clipsLoading = true;

    if (!requestValue.trim()) {
      return;
    }
    this.request = this.searchApi + requestValue;

    if (this.switcher) {
      this.firstStartView(this.request).then(() => {
        window.clipsLoading = false;
      });
      this.switcher = false;
    } else {
      this.nextStartView(this.request).then(() => {
        window.clipsLoading = false;
      });
    }
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function (...args) {
      const context = this;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  start() {
    AppStartPage.render();

    const searchInput = document.querySelector('.search-input');

    searchInput.addEventListener('input', this.debounce((e) => {
      const requestValue = e.target.value;
      this.search(requestValue);
    }, 250));

    searchInput.addEventListener('keydown', (e) => {
      const key = e.which || e.keyCode;
      if (key === 13) {
        const requestValue = e.target.value;
        this.search(requestValue);
      }
    });

    const searchBtn = document.querySelector('button');

    searchBtn.addEventListener('click', (e) => {
      const requestValue = e.target.value;
      this.search(requestValue);
    });
  }
}
