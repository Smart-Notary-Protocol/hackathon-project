export type ClicableBoxProps = {
  title: string
  text: string
  route: string
  button: string
}

export type AllPurposeTableProps = {
  elements: any[]
  method: (address:string) => string | void
  columns?: any
  rowType?:any
}

export interface ColumnType {
  id: 'name' | 'address' | 'dataCap' | 'stake' | 'explaination'
  label: string
  minWidth?: number
  align?: 'left' | 'right'
  format?: (value: number) => string
}

interface RowData {
  name: string
  address: string
  dataCap: string
  stake: string
}
