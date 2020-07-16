export enum Action {
  Initialize,
  Start,
  Error,
  Progress
}

export type FBInstantAction = 
  | { type: Action.Initialize }
  | { type: Action.Start }
  | { type: Action.Progress, value: number }
  | { type: Action.Error, value: Error }

export type FBInstantState = {
  initialized?: boolean,
  started?: boolean,
  progress?: number,
  error?: Error,
  playerData?: { [key: string]: string }
}
