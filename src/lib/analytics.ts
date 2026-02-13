import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

let isInitialized = false;

export const initAnalytics = () => {
  if (isInitialized || !MIXPANEL_TOKEN) return;
  mixpanel.init(MIXPANEL_TOKEN, {
    track_pageview: true,
    persistence: "localStorage",
  });
  isInitialized = true;
};

export const trackEvent = (
  event: string,
  properties?: Record<string, unknown>
) => {
  if (!isInitialized) initAnalytics();
  if (!MIXPANEL_TOKEN) return;
  mixpanel.track(event, properties);
};

export const identifyUser = (email: string) => {
  if (!isInitialized) initAnalytics();
  if (!MIXPANEL_TOKEN) return;
  mixpanel.identify(email);
  mixpanel.people.set({ $email: email });
};
