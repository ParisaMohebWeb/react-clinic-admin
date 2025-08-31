import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { patientsType } from "../assets/types/patientsType";

interface IEditPatientsForm {
  onClose: () => void;
  onSuccess: () => void;
  patient: patientsType;
}

export default function EditPatients({
  onClose,
  onSuccess,
  patient,
}: IEditPatientsForm) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationalCode: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: 1,
    address: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // وقتی مدال باز شد اطلاعات بیمار ست میشه
  useEffect(() => {
    if (patient) {
      setFormData({
        firstName: patient.firstName || "",
        lastName: patient.lastName || "",
        nationalCode: patient.nationalCode || "",
        phoneNumber: patient.phoneNumber || "",
        dateOfBirth: patient.dateOfBirth
          ? new Date(patient.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: patient.gender || 1,
        address: patient.address || "",
      });
    }
  }, [patient]);

  // ارسال اطلاعات تغییر یافته برای ویرایش
  const PutEditPatientsInfo = async () => {
    try {
      const res = await axios.put(
        `https://nowruzi.top/api/Clinic/patients/${patient.id}`,
        formData
      );
      console.log("در حال ارسال به API:", formData);
      onSuccess();
      toast.success("ویرایش با موفقیت انجام شد");
      console.log("newchang", res.data);
    } catch (err) {
      console.error("خطا در ذخیره  ویرایش اطلاعات بیماران", err);
      toast.error("خطا در ذخیره  ویرایش اطلاعات بیماران");
    }
  };

  // اعتبارسنجی و ارسال
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) newErrors.firstName = "لطفاً نام را وارد کنید";
    if (!formData.lastName)
      newErrors.lastName = "لطفاً نام خانوادگی را وارد کنید";
    if (!formData.nationalCode) {
      newErrors.nationalCode = "کد ملی الزامی است";
    } else if (formData.nationalCode.length !== 10) {
      newErrors.nationalCode = "کد ملی باید 10 رقم باشد";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "شماره موبایل الزامی است";
    } else if (formData.phoneNumber.length !== 11) {
      newErrors.phoneNumber = " شماره موبایل باید 11 رقم باشد ";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log("dataform:",formData)
    PutEditPatientsInfo();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        <h3>فرم ویرایش بیمار</h3>

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
            {errors.firstName && (
              <p className="error-text">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label>نام خانوادگی:</label>
            <input
              className="input-blue"
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            {errors.lastName && <p className="error-text">{errors.lastName}</p>}
          </div>

          <div>
            <label>کد ملی:</label>
            <input
              className="input-blue"
              inputMode="numeric"
              value={formData.nationalCode}
              onChange={(e) =>
                setFormData({ ...formData, nationalCode: e.target.value })
              }
              maxLength={10}
            />
            {errors.nationalCode && (
              <p className="error-text">{errors.nationalCode}</p>
            )}
          </div>

          <div>
            <label>موبایل:</label>
            <input
              className="input-blue"
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              maxLength={11}
            />
            {errors.phoneNumber && (
              <p className="error-text">{errors.phoneNumber}</p>
            )}
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
            <input
              className="input-blue"
              type="text"
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
