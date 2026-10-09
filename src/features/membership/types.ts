export type MemberProfile = {
  studentId: string;
  universityYear: "year1" | "year2" | "year3" | "year4" | "year5Plus" | "postgraduate" | null;
  phoneNumber: string;
  degrees: string;
  firstName: string;
  lastName: string;
  hasPaid: boolean;
  paymentDate?: string | null;
};

export type SessionUser = {
  name: string;
  email: string;
};

export type UpcomingEvent = {
  day: string;
  month: string;
  title: string;
  detail: string;
};
