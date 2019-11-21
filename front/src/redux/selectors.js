import { get } from 'lodash'

export const authStateSelector = (state) =>
  get(state, 'auth')

export const recordDetailSelector = (state) =>
  get(state, 'record.record', {})

export const recordsListSelector = (state) =>
  get(state, 'record.records', [])

export const recordStateSelector = (state) =>
  get(state, 'record', {})

export const recordsParamsSelector = (state) =>
  get(state, 'record.params', {})

