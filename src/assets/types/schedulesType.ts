export interface ISchedule {
  id: 1;
  doctor: {
    id: 1;
    firstName: string;
    lastName: string;
    fullName: string;
    medicalLicenseNumber: string;
    phoneNumber: number;
    gender: number;
    genderDisplay: string;
    specialty: {
      id: number;
      name: string;
      doctorsCount: number;
    };
    schedulesCount: number;
  };
  day: string;
  dayDisplay: string;
  startTime: string;
  startTimeDisplay: string;
  endTime: string;
  endTimeDisplay: string;
  appointmentsCount: number;
  isAvailable: boolean;
}
