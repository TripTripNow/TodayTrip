type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Time = {
  id: number;
  startTime: string;
  endTime: string;
};

export type TimeSlot = {
  date: string;
  times: Time[];
};
