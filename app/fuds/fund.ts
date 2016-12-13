export interface Fund {
  id : number,
  name: string,
  link: string,
  portfolio:number,
  [FundValues: FundValue] : any
}

interface FundValue {
  valueDate:Date,
  value:number
}
