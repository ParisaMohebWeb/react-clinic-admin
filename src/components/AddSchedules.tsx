import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import type { IDoctor } from "../assets/types/doctor";
import { useScheduleStore } from "../assets/hooks/SchedulesStore";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddSchedules({ onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    doctorId: 0,
    day: "",
    startTime: "",
    endTime: "",
  });

  const [doctorInfo, setDoctorInfo] = useState<IDoctor[]>([]);
  const { fetchSchedules } = useScheduleStore();

  // دریافت لیست پزشکان
  const getDoctorInfo = useCallback(async () => {
    try {
      const res = await axios.get("https://nowruzi.top/api/Clinic/doctors");
      setDoctorInfo(res.data);
    } catch (err) {
      console.log("API error:", err);
      alert('خطای لیست')
    }
  }, []);

  useEffect(() => {
    getDoctorInfo();
  }, [getDoctorInfo]);

  const postNewSchedules = async () => {
    const { doctorId, day, startTime, endTime } = formData;

    if (!doctorId || !day || !startTime || !endTime) {
      toast.error("لطفاً همه‌ی فیلدها را انتخاب کنید.");
      return;
    }

    try {
      await axios.post("https://nowruzi.top/api/Clinic/schedules", formData);
      toast.success("با موفقیت افزوده شد");

      // آپدیت لیست برنامه‌ها و پزشکان
      fetchSchedules();
      getDoctorInfo();

      onSuccess();
      onClose();
    } catch (error) {
      console.error("خطا در ارسال نوبت:", error);
      toast.error("خطا در افزودن برنامه");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✖</button>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            postNewSchedules();
          }}
        >
          <div>
            <label htmlFor="doctorId"> نام پزشک : </label>
            <select
              id="doctorId"
              value={formData.doctorId}
              onChange={(e) =>
                setFormData({ ...formData, doctorId: Number(e.target.value) })
              }
            >
              <option value={0} disabled>انتخاب پزشک</option>
              {doctorInfo.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.fullName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="day">تاریخ : </label>
            <input
              type="date"
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="startTime">ساعت شروع : </label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="endTime">ساعت پایان : </label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            />
          </div>

          <button>افزودن</button>
        </form>
      </div>
    </div>
  );
}
