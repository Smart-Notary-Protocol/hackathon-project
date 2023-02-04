export type ClicableBoxProps = {
  title: string
  text: string
  route: string
  button: string
}

export type AllPurposeTableProps = {
  elements: any[]
  method: (address: string) => string | void
  columns?: any
  rowType?: any
  accepted?: boolean
}

export interface ColumnType {
  id: 'name' | 'address' | 'dataCap' | 'stake' | 'explaination' | 'status' | 'nNotaries'
  label: string
  minWidth?: number
  align?: 'left' | 'right'
  format?: (value: number) => string
}

export type TextPanelProps = {
  title: string
  texts: string[]
  route?: string
  indexRoute?: number
}

export type AlertProps = {
  type: string
  severity: 'error' | 'warning' | 'info' | 'success'
}
