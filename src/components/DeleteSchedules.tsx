import axios, { AxiosError } from "axios";
import type { ISchedule } from "../assets/types/schedulesType";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  selectedItem: ISchedule;
}
export default function DeleteSchedules({
  onClose,
  onSuccess,
  selectedItem,
}: Props) {
  const deleteSchedules = async () => {
    try{
    const res = await axios.delete(
        `https://nowruzi.top/api/Clinic/schedules/${selectedItem.id}`
    );

    console.log(res.data);
    onSuccess();
    onClose();
    toast.success(" با موفقیت حذف شد ");
  }catch (err) {
  const error = err as AxiosError<{ message?: string }>;
  console.error("خطا در حذف برنامه:", error.response?.data || error.message);
  toast.error(error.response?.data?.message || " خطایی رخ داده است ");
}
}

  return (
    <div className=" modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          ✖{" "}
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "15px",
          }}
        >
          <p style={{ marginBottom: "10px" }}>
            آیا برنامه{" "}
            <strong>
              {" "}
              {selectedItem.doctor.genderDisplay} {selectedItem.doctor.fullName}
            </strong>{" "}
            حذف شود؟
          </p>
          <div>
            <button
              onClick={deleteSchedules}
              className="btn-green"
              style={{ width: "40px" }}
            >
              بله
            </button>
            <button onClick={onClose} className="btn-red" style={{ width: "40px" }}>
              خیر
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
