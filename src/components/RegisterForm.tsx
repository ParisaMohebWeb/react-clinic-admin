import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface RegisterFormProps {
  onClose: () => void;
  onSuccess: () => void;
}
interface specialtyProps {
  id: number;
  name: string;
  doctorsCount: number;
}
interface IDoctor {
  specialtyId: number;
  firstName: string;
  lastName: string;
  medicalLicenseNumber: string;
  phoneNumber: string;
  gender: number;
}
type DoctorFormState = Omit<IDoctor, "specialtyId" | "gender"> & {
  specialtyId: number | "";
  gender: number | "";
};

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [specialty, setSpecialty] = useState<specialtyProps[]>([]);
  const [formData, setFormData] = useState<DoctorFormState>({
    specialtyId: "",
    firstName: "",
    lastName: "",
    medicalLicenseNumber: "",
    phoneNumber: "",
    gender: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const getSpecialties = async () => {
      try {
        const res = await axios.get(
          "https://nowruzi.top/api/Clinic/specialties"
        );
        setSpecialty(res.data);
      } catch (err) {
        console.error("Error fetching specialties", err);
      }
    };
    getSpecialties();
  }, []);

  const postNewDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "https://nowruzi.top/api/Clinic/doctors",
        formData
      );
      onSuccess();
      console.log(res.data);
    } catch (err) {
      console.error("خطا در ذخیره اطلاعات پزشکان", err);
      toast.error("خطا در ذخیره اطلاعات پزشکان");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) {
      newErrors.firstName = "لطفاً نام را وارد کنید";
    }
    if (!formData.lastName) {
      newErrors.lastName = "لطفاً نام خانوادگی را وارد کنید";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "شماره موبایل الزامی است";
    } else if (formData.phoneNumber.length !== 11) {
      newErrors.phoneNumber = " شماره موبایل باید 11 رقم باشد ";
    }
    if (!formData.specialtyId) {
      newErrors.specialtyId = "لطفاً تخصص را انتخاب کنید";
    }
    if (!formData.medicalLicenseNumber) {
      newErrors.medicalLicenseNumber = " کد نظام پزشکی الزامی است";
    }
    if (!formData.gender) {
      newErrors.gender = "لطفاً جنسیت را انتخاب کنید";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // ارسال متوقف می‌شود
    }
    setErrors({});
    console.log("Sending data:", formData); //ببینم چی می‌فرستم
    postNewDoctorInfo();
  };

  return (
    <div className="register-form">
      <h3>فرم ثبت نام پزشک</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <p>انتخاب تخصص:</p>
          <select
            value={formData.specialtyId}
            onChange={(e) =>
              setFormData({ ...formData, specialtyId: Number(e.target.value) })
            }
            className="input-blue"
          >
            <option value="" disabled>
              انتخاب تخصص
            </option>
            {specialty.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.specialtyId && (
            <p className="error-text">{errors.specialtyId}</p>
          )}
        </div>

        <div>
          <label>نام:</label>
          <input
            className="input-blue"
            type="text"
            placeholder="نام"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          {errors.firstName && <p className="error-text">{errors.firstName}</p>}
        </div>

        <div>
          <label>نام خانوادگی:</label>
          <input
            className="input-blue"
            type="text"
            placeholder="نام خانوادگی"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          {errors.lastName && <p className="error-text">{errors.lastName}</p>}
        </div>

        <div>
          <label>کد نظام پزشکی:</label>
          <input
            className="input-blue"
            type="text"
            placeholder="کد نظام پزشکی"
            value={formData.medicalLicenseNumber}
            onChange={(e) =>
              setFormData({ ...formData, medicalLicenseNumber: e.target.value })
            }
          />
          {errors.medicalLicenseNumber && (
            <p className="error-text">{errors.medicalLicenseNumber}</p>
          )}
        </div>

        <div>
          <label>موبایل:</label>
          <input
            className="input-blue"
            type="tel"
            pattern="[0-9]*"
            inputMode="numeric"
            placeholder="شماره موبایل"
            value={formData.phoneNumber || ""}
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
          <p>جنسیت:</p>
          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: Number(e.target.value) })
            }
            className="input-blue"
          >
            <option value="" disabled>
              انتخاب جنسیت
            </option>
            <option value={1}>مرد</option>
            <option value={2}>زن</option>
          </select>
          {errors.gender && <p className="error-text">{errors.gender}</p>}
        </div>

        <button className="btn-blue" type="submit">
          ذخیره
        </button>
      </form>
    </div>
  );
}
