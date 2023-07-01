const AsyncActionStatus = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};
type AsyncActionStatus =
  (typeof AsyncActionStatus)[keyof typeof AsyncActionStatus];

type AsyncActionState = {
  status: AsyncActionStatus;
};

export { AsyncActionStatus };
export type { AsyncActionState };
