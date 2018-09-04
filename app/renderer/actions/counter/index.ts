import { INCREMENT, DECREMENT } from './action_type';

export type counterActions = Increment | Decrement;

interface Increment {
  type: INCREMENT;
}

export function increment(): Increment {
  return {
    type: INCREMENT,
  };
}

interface Decrement {
  type: DECREMENT;
}

export function decrement(): Decrement {
  return {
    type: DECREMENT
  };
}
