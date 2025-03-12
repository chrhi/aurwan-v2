import ReactPixel from "react-facebook-pixel";

// Replace with your actual Facebook Pixel ID
const FACEBOOK_PIXEL_ID = "630224289621963";

// Initialize Facebook Pixel
export const initFacebookPixel = () => {
  if (typeof window !== "undefined") {
    ReactPixel.init(FACEBOOK_PIXEL_ID);
  }
};

// Track page view
export const pageView = () => {
  if (typeof window !== "undefined") {
    ReactPixel.pageView();
  }
};

// Track standard events
export const trackFbEvent = (event: string, data = {}) => {
  if (typeof window !== "undefined") {
    ReactPixel.track(event, data);
  }
};

// Standard Facebook Pixel events
export const fbEvents = {
  // Content related events
  viewContent: (data: {
    content_name?: string;
    content_ids?: string[];
    content_type?: string;
    value?: number;
    currency?: string;
  }) => {
    trackFbEvent("ViewContent", data);
  },

  // Shopping cart related events
  addToCart: (data: {
    content_ids?: string[];
    content_name?: string;
    content_type?: string;
    value?: number;
    currency?: string;
  }) => {
    trackFbEvent("AddToCart", data);
  },
  addToWishlist: (data: {
    content_ids?: string[];
    content_name?: string;
    content_type?: string;
    value?: number;
    currency?: string;
  }) => {
    trackFbEvent("AddToWishlist", data);
  },

  // Checkout related events
  initiateCheckout: (data: {
    content_ids?: string[];
    content_name?: string;
    content_type?: string;
    value?: number;
    currency?: string;
    num_items?: number;
  }) => {
    trackFbEvent("InitiateCheckout", data);
  },

  // Purchase related events
  purchase: (data: {
    content_ids?: string[];
    content_name?: string;
    content_type?: string;
    value: number;
    currency: string;
    num_items?: number;
  }) => {
    trackFbEvent("Purchase", data);
  },

  // Lead generation events
  lead: (data: {
    content_name?: string;
    content_category?: string;
    value?: number;
    currency?: string;
  }) => {
    trackFbEvent("Lead", data);
  },

  // Complete registration
  completeRegistration: (data: {
    content_name?: string;
    currency?: string;
    value?: number;
  }) => {
    trackFbEvent("CompleteRegistration", data);
  },

  // Contact related events
  contact: (data = {}) => {
    trackFbEvent("Contact", data);
  },

  // Custom events
  customEvent: (eventName: string, data = {}) => {
    trackFbEvent(eventName, data);
  },
};
