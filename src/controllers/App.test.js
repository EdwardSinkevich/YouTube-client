import App from './App';

describe('constructor', () => {
  let app;

  beforeEach(() => {
    app = new App();
  });

  it('assigns link to searchApi to this.searchApi', () => {
    const link = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBNvSu2heQzLIGA2dB0NMgG-alWk4gvJYU&type=video&part=snippet&maxResults=15&q=';
    expect(app.searchApi).toEqual(link);
  });

  it('assigns request to null', () => {
    expect(app.request).toBeNull();
  });

  it('assigns switcher to true', () => {
    expect(app.switcher).toBeTruthy();
  });

  it('assigns videoInfo to null', () => {
    expect(app.videoInfo).toBeNull();
  });

  it('assigns slider to null', () => {
    expect(app.slider).toBeNull();
  });
});

describe('search', () => {
  const app = new App();

  it('assigns request to this.request', () => {
    const request = 'test';
    const requestValue = app.searchApi + request;

    app.search(request);

    expect(app.request).toEqual(requestValue);
  });

  it('assigns false to this.switcher if it equals true', () => {
    app.switcher = true;

    const request = 'test';
    app.search(request);

    expect(app.switcher).toEqual(false);
  });

  it('Should create slider', () => {
    const videoInfo = {
      nextPageToken: null,
      id: [1, 2, 3],
      titles: ['title', 'title1', 'title2'],
      thumbnails: ['thumbnails1', 'thumbnails2', 'thumbnails3'],
      descriptions: ['qwerty', 'qwerty1', 'qwerty2'],
      channelTitles: ['channelTitles1', 'channelTitles2', 'channelTitles3'],
      uploadDates: ['11.11.1111', '22.22.2222', '33.33.3333'],
      viewCounts: [1, 2, 3],
    };

    app.start();
    app.createSlider(videoInfo);

    expect(app.slider.querySelector('.info-date').innerHTML).toEqual('11.11.1111');
  });
});
