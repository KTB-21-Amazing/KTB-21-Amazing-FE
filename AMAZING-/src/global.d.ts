export {};

declare global {
  interface Window {
    openModal: () => void;
  }
}

declare global {
  interface Window {
    navigateToMeetNPC?: () => void;
  }
}
export {};
