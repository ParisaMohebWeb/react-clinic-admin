import axios from "axios";
import { toast } from "react-toastify";

interface IDoctorDeleteForm {
  onClose: () => void;
  onSuccess: () => void;
  DoctorId: number;
  gender: number;
  fullName: string;
}
export default function DeleteDoctor({
  onClose,
  onSuccess,
  DoctorId,
  gender,
  fullName,
}: IDoctorDeleteForm) {
  const genderText = gender === 1 ? "آقای" : gender === 2 ? "خانم" : "";

  const handleDeleteDocter = async () => {
    try {
      const res = await axios.delete(
        `https://nowruzi.top/api/Clinic/doctors/${DoctorId}`
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
    <div>
      <p>
        {" "}
        آیا اطلاعات{" "}
        <strong>
          {" "}
          {genderText} دکتر {fullName}{" "}
        </strong>{" "}
        از لیست حذف شود؟
      </p>
      <button className="btn-green" onClick={handleDeleteDocter}>
        بله
      </button>
      <button className="btn-red" onClick={onClose}>
        خیر
      </button>
    </div>
  );
}
