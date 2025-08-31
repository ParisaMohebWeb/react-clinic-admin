import type { patientsType } from "../assets/types/patientsType";

interface IDelitespatient {
  onClose: () => void;
  patient: patientsType;
}
export default function PatientDetails({ onClose, patient }: IDelitespatient) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>اطلاعات بیمار</h3>
        <button onClick={onClose} className="modal-close">
          ✖{" "}
        </button>
        <div className="patient-details">
          <p>
            {" "}
            ID بیمار : <strong>{patient.id}</strong>
          </p>
          <p>
            {" "}
            نام : <strong>{patient.firstName}</strong>{" "}
          </p>
          <p>
            {" "}
            نام و نام خانوادگی : <strong>{patient.lastName}</strong>{" "}
          </p>
          <p>
            {" "}
            جنسیت : <strong>{patient.genderDisplay}</strong>{" "}
          </p>
          <p>
            {" "}
            تاریخ ثبت نام : <strong>{patient.registrationDate}</strong>{" "}
          </p>
          <p>
            آدرس : <strong> {patient.address} </strong>
          </p>
        </div>
      </div>
    </div>
  );
}
