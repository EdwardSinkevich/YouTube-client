import AppClips from './AppClips';

describe('constructor', () => {
  let videoInfo;
  let appClips;

  beforeEach(() => {
    videoInfo = {
      id: [1, 2, 3],
      titles: ['title', 'title1', 'title2'],
      viewCounts: [1123, 1111, 4233],
    };
    appClips = new AppClips(videoInfo);
  });

  it('assigns this.videoInfo to videoInfo', () => {
    expect(appClips.videoInfo).toEqual(videoInfo);
  });

  it('assigns [] to <ul this.clips', () => {
    expect(appClips.clips).toEqual([]);
  });
});

describe('generateClips', () => {
  let videoInfo;
  let appClips;

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

    appClips = new AppClips(videoInfo);
  });

  it('Should return array of clips', () => {
    expect(appClips.generateClips()).toBeInstanceOf(Array);
  });
});
