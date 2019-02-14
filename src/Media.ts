const subscribers: any = [];
let mediaSize: any;

const observer = window.matchMedia("(max-width: 500px)");
export const myListener = (media: any) => {
  // let mediaSize: string;
  if (media.matches) {
    mediaSize = "small";
  } else {
    mediaSize = "large";
  }
  subscribers.map((callback: any) => callback(mediaSize));
  return mediaSize;
};
observer.addListener(myListener);
myListener(observer);

export const getMediaSize = () => {
  myListener(observer);
};

export const watchMediaSize = (callback: any) =>
  subscribe(callback);

export const subscribe = (callback: any) => {
  subscribers.push(callback);
};

export const watchDevice = () => {};
