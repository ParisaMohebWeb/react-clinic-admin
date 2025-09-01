export interface IAppointment {
  id: 0;
  patient: {
    id: 0;
    firstName: string;
    lastName: string;
    fullName: string;
    nationalCode: string;
    phoneNumber: string;
    dateOfBirth: string;
    age: 0;
    gender: 1;
    genderDisplay: string;
    address: string;
    registrationDate: string;
    appointmentsCount: 0;
  };
  doctorSchedule: {
    id: 0;
    doctor: {
      id: 0;
      firstName: string;
      lastName: string;
      fullName: string;
      medicalLicenseNumber: string;
      phoneNumber: string;
      gender: 1;
      genderDisplay: string;
      specialty: {
        id: 0;
        name: string;
        doctorsCount: 0;
      };
      schedulesCount: 0;
    };
    day: string;
    dayDisplay: string;
    startTime: string;
    startTimeDisplay: string;
    endTime: string;
    endTimeDisplay: string;
    appointmentsCount: 0;
    isAvailable: true;
  };
  reason: string;
  notes: string;
  createdDate: string;
  lastModifiedDate: string;
  cancelledDate: string;
  cancellationReason: string;
  isCancelled: true;
  status: string;
}
