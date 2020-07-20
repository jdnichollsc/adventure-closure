export const PROGRESS_BAR = 'progressBar'
export const PROGRESS_BG = 'progressBg'
export const BUSINESS_BG = 'businessBg'

export const BUSINESS_SPRITES = {
  CARD_BG: 'businessCardBg',
  PROGRESS_BAR: 'businessProgressBar',
  PROGRESS_BAR_BOX: 'businessProgressBarBox',
  BUY_BUTTON: 'buyButton',
  BUY_DISABLED_BUTTON: 'buyDisabledButton',
  MANAGER_BUTTON: 'managerButton',
  MANAGER_DISABLED_BUTTON: 'managerDisabledButton'
}

export const PLAYER_SPRITES = {
  PROFILE_IMG: 'player'
}

export const MAIN_SPRITES = {
  ...PLAYER_SPRITES,
  ...BUSINESS_SPRITES
}
