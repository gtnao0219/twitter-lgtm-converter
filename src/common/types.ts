export type Message = ChangeEnabledMessage

export type ChangeEnabledMessage = {
  type: 'changeEnabled'
  payload: boolean
}
