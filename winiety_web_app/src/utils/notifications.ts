export const checkSupport = (): boolean => {
  if (!('serviceWorker' in navigator)) {
    // eslint-disable-next-line no-console
    console.error('No Service Worker support!');
    return false;
  }
  if (!('PushManager' in window)) {
    // eslint-disable-next-line no-console
    console.error('No Push API Support!');
    return false;
  }
  return true;
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    // eslint-disable-next-line no-console
    console.error('Permission not granted for Notification');
    return false;
  }
  return true;
};

export const displayNotification = (title: string, body: string): void => {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then((reg) => {
      const options = {
        body,
        icon: 'images/logo.png',
        vibrate: [100, 50, 100],
      };
      reg?.showNotification(title, options);
    });
  }
};

export const getSubscription = async (): Promise<
  PushSubscription | null | undefined
> => {
  if ('serviceWorker' in navigator) {
    const worker = await navigator.serviceWorker.getRegistration();
    const sub = await worker?.pushManager.getSubscription();
    if (!sub) {
      // eslint-disable-next-line no-console
      console.error('Not subscribed to push service!');
      return null;
    }
    return sub;
  }
  return null;
};

const urlB64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    // eslint-disable-next-line no-useless-escape
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const subscribeUser = async (
  key: string
): Promise<PushSubscription | null> => {
  let sub: PushSubscription | null = null;
  if ('serviceWorker' in navigator) {
    const reg = await navigator.serviceWorker.ready;
    try {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(key),
      });
    } catch (error) {
      if (Notification.permission === 'denied') {
        // eslint-disable-next-line no-console
        console.warn('Permission for notifications was denied');
      } else {
        // eslint-disable-next-line no-console
        console.error('Unable to subscribe to push', error);
      }
    }
  }
  return sub;
};
