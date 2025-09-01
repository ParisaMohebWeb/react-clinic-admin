import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import type { patientsType } from "../assets/types/patientsType";
import { useAppointmentStore } from "../assets/hooks/AppointmentsStore";
import type {ISchedule} from '../assets/types/schedulesType'
interface Props {
  onClose: () => void;
  onSuccess: () => void;
}


export default function AddAppointments({ onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    patientId: 0,
    doctorScheduleId: 0,
    reason: "",
    notes: "",
  });

  const [patientList, setPatientList] = useState<patientsType[]>([]);
  const [scheduleList, setScheduleList] = useState<ISchedule[]>([]);
  const { fetchAppointment } = useAppointmentStore();

  // دریافت لیست بیماران
  const getPatientList = useCallback(async () => {
    try {
      const res = await axios.get("https://nowruzi.top/api/Clinic/patients");
      setPatientList(res.data);
    } catch (err) {
      console.error("خطا در دریافت بیماران:", err);
      toast.error("خطا در دریافت لیست بیماران");
    }
  }, []);

  // دریافت لیست برنامه‌های پزشک
const getSchedules = useCallback(async () => {
  try {
    const res = await axios.get("https://nowruzi.top/api/Clinic/schedules");
    const availableSchedules = res.data.filter((s: ISchedule) => s.isAvailable);
    setScheduleList(availableSchedules);
  } catch (err) {
    console.error("خطا در دریافت برنامه پزشک:", err);
    toast.error("خطا در دریافت برنامه‌های پزشک");
  }
}, []);


  useEffect(() => {
    getPatientList();
    getSchedules();
  }, [getPatientList, getSchedules]);

  const postNewAppointment = async () => {
    const { patientId, doctorScheduleId, reason } = formData;

    if (!patientId || !doctorScheduleId || !reason.trim()) {
      toast.error("لطفاً همه‌ی فیلدهای ضروری را پر کنید.");
      return;
    }

    try {
      await axios.post("https://nowruzi.top/api/Clinic/appointments", formData);
      toast.success("نوبت با موفقیت ثبت شد");

      fetchAppointment(); // آپدیت لیست نوبت‌ها
      onSuccess();
      onClose();
    } catch (error) {
      console.error("خطا در ثبت نوبت:", error);
      toast.error("ثبت نوبت با خطا مواجه شد");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        <h3>افزودن نوبت جدید</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postNewAppointment();
          }}
        >
          {/* انتخاب بیمار */}
          <div>
            <label htmlFor="patientId">نام بیمار:</label>
            <select
              className="input-blue"
              id="patientId"
              value={formData.patientId}
              onChange={(e) =>
                setFormData({ ...formData, patientId: Number(e.target.value) })
              }
            >
              <option value={0} disabled>
                انتخاب بیمار
              </option>
              {patientList.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* انتخاب برنامه پزشک */}
          <div>
            <label htmlFor="doctorScheduleId">برنامه پزشک:</label>
            <select
            className="input-blue"
              id="doctorScheduleId"
              value={formData.doctorScheduleId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  doctorScheduleId: Number(e.target.value),
                })
              }
            >
              <option value={0} disabled>
                انتخاب برنامه پزشک
              </option>
              {scheduleList.map((schedule) => (
                <option key={schedule.id} value={schedule.id}>
                  {schedule.doctor.fullName} - {schedule.doctor.specialty.name}{" "}
                  | {schedule.dayDisplay} ({schedule.startTime} تا{" "}
                  {schedule.endTime})
                </option>
              ))}
            </select>
          </div>

          {/* دلیل نوبت */}
          <div>
            <label htmlFor="reason">دلیل مراجعه:</label>
            <input
              className="input-blue"
              type="text"
              id="reason"
              value={formData.reason}
              onChange={(e) =>
                setFormData({ ...formData, reason: e.target.value })
              }
            />
          </div>

          {/* یادداشت‌ها */}
          <div>
            <label htmlFor="notes">یادداشت:</label>
            <textarea
              className="input-blue"
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>

          <button type="submit" className="btn-green">
            ثبت نوبت
          </button>
        </form>
      </div>
    </div>
  );
}
