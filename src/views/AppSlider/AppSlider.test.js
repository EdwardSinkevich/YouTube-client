import AppSlider from './AppSlider';
import AppStartPage from '../AppStartPage/AppStartPage';

describe('constructor', () => {
  let videoInfo;
  let appSlider;
  beforeEach(() => {
    videoInfo = {
      id: [1, 2, 3],
      titles: ['title', 'title1', 'title2'],
      viewCounts: [1123, 1111, 4233],
    };
    AppStartPage.render();
    appSlider = new AppSlider(videoInfo);
  });

  it('assigns this.videoInfo to videoInfo', () => {
    expect(appSlider.videoInfo).toEqual(videoInfo);
  });

  it('assigns this.videoInfo to <ul class="clips"></ul> ', () => {
    const clips = document.querySelector('.clips');

    expect(appSlider.slider).toEqual(clips);
  });
});

describe('addFirstRequestClips', () => {
  let videoInfo;
  let slider;
  beforeEach(() => {
    videoInfo = {
      nextPageToken: null,
      id: [1, 2, 3],
      titles: ['title', 'title1', 'title2'],
      thumbnails: ['thumbnails1', 'thumbnails2', 'thumbnails3'],
      descriptions: ['qwerty', 'qwerty1', 'qwerty2'],
      channelTitles: ['channelTitles1', 'channelTitles2', 'channelTitles3'],
      uploadDates: ['11.11.1111', '22.22.2222', '33.33.3333'],
      viewCounts: [1, 2, 3],
    };
    AppStartPage.render();

    const appSlider = new AppSlider(videoInfo);
    slider = appSlider.addFirstRequestClips();
  });

  it('Should add clips to slider', () => {
    expect(slider.firstChild).not.toBeNull();
  });
});

describe('addNextRequestClips', () => {
  let videoInfo;
  let appSlider;
  let slider;
  let beforeaddNextRequestClips;
  let afteraddNextRequestClips;
  beforeEach(() => {
    videoInfo = {
      nextPageToken: null,
      id: [1, 2, 3],
      titles: ['title', 'title1', 'title2'],
      thumbnails: ['thumbnails1', 'thumbnails2', 'thumbnails3'],
      descriptions: ['qwerty', 'qwerty1', 'qwerty2'],
      channelTitles: ['channelTitles1', 'channelTitles2', 'channelTitles3'],
      uploadDates: ['11.11.1111', '22.22.2222', '33.33.3333'],
      viewCounts: [1, 2, 3],
    };
    AppStartPage.render();

    appSlider = new AppSlider(videoInfo);
    slider = appSlider.addFirstRequestClips();
    beforeaddNextRequestClips = slider.innerHTML;

    appSlider.addNextRequestClips();
    afteraddNextRequestClips = slider.innerHTML;
  });

  it('Should add clips to slider if request next time', () => {
    expect(beforeaddNextRequestClips).not.toEqual(afteraddNextRequestClips);
  });
});
