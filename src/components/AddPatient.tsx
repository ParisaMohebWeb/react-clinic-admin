import { useState } from "react";
import type { patientsType } from "../assets/types/patientsType";
import axios from "axios";

interface IAddPatient {
  onClose: () => void;
  onSuccess: () => void;
  patient: patientsType;
}
export default function AddPatient({
  onClose,
  onSuccess,
  patient,
}: IAddPatient) {
  const [formData, setFormData] = useState({
    firstName: patient?.firstName || "",
    lastName: patient?.lastName || "",
    age:patient?.age || 0,
    nationalCode: patient?.nationalCode || "",
    phoneNumber: patient?.phoneNumber || "",
    dateOfBirth: patient?.dateOfBirth || "",
    gender: patient?.gender || 1,
    address: patient?.address || "",
  });

const postPatientInfo = async ()=>{
  const res = await axios.post('https://nowruzi.top/api/Clinic/patients',formData)

  console.log("fainaly code:", res.data)
  onSuccess();
  onClose();
}


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postPatientInfo();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <form onSubmit={handleSubmit} className="edit-patients-form">
          <div>
            <label>نام:</label>
            <input
              className="input-blue"
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </div>

          <div>
            <label>نام خانوادگی:</label>
            <input
              className="input-blue"
              type="text"
              value={formData.lastName}
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
              }}
            />
          </div>
<div>
            <label> سن : </label>
            <input
              className="input-blue"
              inputMode="numeric"
              maxLength={2}
              value={formData.age}
              onChange={(e) => {
                setFormData({ ...formData, age: Number(e.target.value )});
              }}
            />
          </div>

          <div>
            <label>کد ملی:</label>
            <input
              className="input-blue"
              inputMode="numeric"
              maxLength={10}
              value={formData.nationalCode}
              onChange={(e) => {
                setFormData({ ...formData, nationalCode: e.target.value });
              }}
            />
          </div>

          <div>
            <label>موبایل:</label>
            <input
              className="input-blue"
              type="tel"
              maxLength={11}
              value={formData.phoneNumber}
              onChange={(e) => {
                setFormData({ ...formData, phoneNumber: e.target.value });
              }}
            />
          </div>

          <div>
            <label>تاریخ تولد:</label>
            <input
              className="input-blue"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
            />
          </div>

          <div>
            <p>جنسیت:</p>
            <select
              className="input-blue"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: Number(e.target.value) })
              }
            >
              <option value={1}>مرد</option>
              <option value={2}>زن</option>
            </select>
          </div>

          <div>
            <label>آدرس:</label>
            <textarea
              className="input-blue"
              rows={3}
              placeholder="آدرس بیمار را وارد کنید..."
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <button className="btn-blue" type="submit">
            ذخیره
          </button>
        </form>
      </div>
    </div>
  );
}
