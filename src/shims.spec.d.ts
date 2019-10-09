import NativeTimer = NodeJS.Timer;

declare global {
  type Timer = NativeTimer;
}

export {};
