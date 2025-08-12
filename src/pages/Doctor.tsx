import axios from "axios";
import { useEffect, useState } from "react";
import ModalRegister from "../components/ModalRegister";
import RegisterForm from "../components/RegisterForm";
import { toast } from "react-toastify";

interface IDoctor {
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
}

export default function Doctor() {
  const [doctorInfo, setDoctorInfo] = useState<IDoctor[]>([]);
  const [specialties, setSpecialties] = useState<Record<number, string>>({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const GetDocterList = async () => {
      try {
        const res = await axios.get("https://nowruzi.top/api/Clinic/doctors");
        setDoctorInfo(res.data);

        // واکشی تخصص‌ها برای هر پزشک
        const specialtyMap: Record<number, string> = {};
        for (const doctor of res.data) {
          const id = doctor.specialty.id;
          if (!specialtyMap[id]) {
            try {
              const specialtyRes = await axios.get(
                `https://nowruzi.top/api/Clinic/specialties/${id}`
              );
              specialtyMap[id] = specialtyRes.data.name;
            } catch (err) {
              console.log(err);
            }
          }
        }
        setSpecialties(specialtyMap);
      } catch (err) {
        console.log(err, "خطایی در گرفتن داده رخ داده است");
      }
    };
    GetDocterList();
  }, []);

  // برای کنترل اسکرول نخوردن صفحه بعد از باز شدن مدال
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"; // قفل اسکرول
    } else {
      document.body.style.overflow = "auto"; // برگردوندن حالت عادی
    }
    // تمیزکاری در صورت ترک صفحه
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <div className="doctor-page">
      <div>
        <div>
          <h3>لیست پزشکان</h3>
          <input
            className="input-blue"
            type="text"
            placeholder="🔎جستجو پزشک"
          />
        </div>
        <button onClick={() => setShowModal(true)} className="btn-green">
          {" "}
          ➕ افزودن پزشک
        </button>
        {showModal && (
          <ModalRegister onClose={() => setShowModal(false)}>
            <RegisterForm
              onClose={() => setShowModal(false)}
              onSuccess={() => {
                toast.success("تخصص اضافه شد");
                setShowModal(false);
              }}
            />
          </ModalRegister>
        )}
      </div>

      <table className="tb-doctor">
        <tbody>
          <tr>
            <th>نام و نام خانوادگی</th>
            <th>شماره تماس</th>
            <th>تخصص </th>
            <th>عملیات </th>
          </tr>

          {doctorInfo.map((item) => (
            <tr key={item.id}>
              <td>{item.fullName}</td>
              <td>{item.phoneNumber}</td>
              <td>{specialties[item.specialty.id] || "در حال بارگذاری..."}</td>
              <td>
                <button className="btn-red">حذف</button>
                <button className="btn-green">ویرایش</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
