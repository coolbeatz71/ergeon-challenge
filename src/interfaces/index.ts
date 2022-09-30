export interface ISelectDateParams {
  day: Date;
  setYear: (val: number) => void;
  setMonth: (val: number) => void;
  onChange?: (date: Date | null) => void;
  setSelectedDate: (val: Date | null) => void;
}

export interface IChangeMonthParams {
  year: number;
  month: number;
  increment: number;
  setYear: (val: number) => void;
  setMonth: (val: number) => void;
}

export interface IHeaderParams {
  days: string[];
  months: string[];
  selectedDate: Date | null;
  dateDisplayFormat?: string | null;
}
