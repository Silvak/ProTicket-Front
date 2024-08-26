export interface History {
  id: string
  note: string
  date: string
  dolarAmount: string
  amount: string
  badge: string
  paymentType: string
  ref: string
  ticket: string
  seller: string
}

export interface HistoryCreate {
  note: string
  date: string
  dolarAmount: string
  amount: string
  badge: string
  paymentType: string
  ref: string
  ticket: string
  seller: string
}

export interface HistoryUpdate {
  id: string
  note: string
  date: string
  dolarAmount: string
  amount: string
  badge: string
  paymentType: string
  ref: string
  ticket: string
  seller: string
}
