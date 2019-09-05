import AppModel from './AppModel';

describe('constructor', () => {
  it('assigns request to this.request', () => {
    const request = 'request';
    const appModel = new AppModel(request);

    expect(appModel.request).toEqual(request);
  });

  it('assigns request to this.request', () => {
    const request = 'request';
    const appModel = new AppModel(request);

    expect(appModel.videoInfo).toBeInstanceOf(Object);
  });
});

describe('takeData', () => {
  it('Should add id to videoInfo', () => {
    const request = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBNvSu2heQzLIGA2dB0NMgG-alWk4gvJYU&type=video&part=snippet&maxResults=15&q=test';
    const appModel = new AppModel(request);
    appModel.takeData();
    expect(appModel.videoInfo.id[1]).not.toBeNull();
  });
});

describe('extractVideoInfo', () => {
  const request = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBNvSu2heQzLIGA2dB0NMgG-alWk4gvJYU&type=video&part=snippet&maxResults=15&q=test';
  const appModel = new AppModel(request);

  beforeEach(() => {
    appModel.extractVideoInfo();
  });

  it('Should add titles to videoInfo', () => {
    expect(appModel.videoInfo.titles[1]).not.toBeNull();
  });

  it('Should add thumbnails to videoInfo', () => {
    expect(appModel.videoInfo.thumbnails[1]).not.toBeNull();
  });

  it('Should add descriptions to videoInfo', () => {
    expect(appModel.videoInfo.descriptions[1]).not.toBeNull();
  });

  it('Should add channel titles to videoInfo', () => {
    expect(appModel.videoInfo.channelTitles[1]).not.toBeNull();
  });

  it('Should add viewCounts to videoInfo', () => {
    expect(appModel.videoInfo.viewCounts[1]).not.toBeNull();
  });

  it('Should add uploadDates to videoInfo', () => {
    expect(appModel.videoInfo.uploadDates[1]).not.toBeNull();
  });

  it('Return value should be instance of object', () => {
    expect(appModel.extractVideoInfo()).toBeInstanceOf(Object);
  });
});
