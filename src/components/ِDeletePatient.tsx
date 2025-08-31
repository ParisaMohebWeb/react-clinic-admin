import axios from "axios";
import { toast } from "react-toastify";

import type { patientsType } from "../assets/types/patientsType";

interface IPatientDeleteForm {
  onClose: () => void;
  patient: patientsType;
  onSuccess: () => void;
}
export default function DeletePatient({
  onClose,
  onSuccess,
  patient,
}: IPatientDeleteForm) {
  const genderText = patient.gender === 1 ? "آقای" : patient.gender === 2 ? "خانم" : "";

  const handleDeletePatient = async () => {
    try {
      const res = await axios.delete(
        `https://nowruzi.top/api/Clinic/patients/${patient.id}`
      );
      console.log(res.data);
      onSuccess();
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data || "خطا");
      } else {
        toast.error(" خطایی رخ داده است");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div>
          <button onClick={onClose} className="modal-close">
            ✖{" "}
          </button>

          <p>
            {" "}
            آیا اطلاعات{" "}
            <strong>
              {" "}
              {genderText} دکتر {patient.fullName}{" "}
            </strong>{" "}
            از لیست حذف شود؟
          </p>
          <button className="btn-green" onClick={handleDeletePatient}>
            بله
          </button>
          <button className="btn-red" onClick={onClose}>
            خیر
          </button>
        </div>
      </div>
    </div>
  );
}
