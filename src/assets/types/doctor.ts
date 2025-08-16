export interface IDoctor {
  id: number;
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
}
