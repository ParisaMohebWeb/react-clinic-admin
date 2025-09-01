import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import type { AppointmentType } from "../assets/types/appointmentType";
import type { patientsType } from "../assets/types/patientsType";
import { useAppointmentStore } from "../assets/hooks/AppointmentsStore";

interface Props {
  appointment: AppointmentType;
  onClose: () => void;
  onSuccess: () => void;
}

interface ScheduleType {
  id: number;
  doctor: {
    fullName: string;
    specialty: {
      name: string;
    };
  };
  dayDisplay: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export default function EditAppointment({ appointment, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    patientId: appointment.patientId ?? 0,
    doctorScheduleId: appointment.doctorScheduleId ?? 0,
    reason: appointment.reason ?? "",
    notes: appointment.notes ?? "",
  });

  const [patientList, setPatientList] = useState<patientsType[]>([]);
  const [scheduleList, setScheduleList] = useState<ScheduleType[]>([]);
  const { fetchAppointment } = useAppointmentStore();

  const getPatientList = useCallback(async () => {
    try {
      const res = await axios.get("https://nowruzi.top/api/Clinic/patients");
      setPatientList(res.data);
    } catch (err) {
      console.error("خطا در دریافت بیماران:", err);
      toast.error("خطا در دریافت لیست بیماران");
    }
  }, []);

  const getSchedules = useCallback(async () => {
    try {
      const res = await axios.get("https://nowruzi.top/api/Clinic/schedules");
      const available = res.data.filter((s: ScheduleType) => s.isAvailable);
      setScheduleList(available);
    } catch (err) {
      console.error("خطا در دریافت برنامه پزشک:", err);
      toast.error("خطا در دریافت برنامه‌های پزشک");
    }
  }, []);

  useEffect(() => {
    getPatientList();
    getSchedules();
  }, [getPatientList, getSchedules]);

  const updateAppointment = async () => {
    const { patientId, doctorScheduleId, reason } = formData;

    if (!patientId || !doctorScheduleId || reason.trim() === "") {
      toast.error("لطفاً همه‌ی فیلدهای ضروری را پر کنید.");
      return;
    }

    try {
      await axios.put(
        `https://nowruzi.top/api/Clinic/appointments/${appointment.id}`,
        formData
      );
      toast.success("نوبت با موفقیت ویرایش شد");
      fetchAppointment();
      onSuccess();
      onClose();
    } catch (error) {
      console.error("خطا در ویرایش نوبت:", error);
      toast.error("ویرایش نوبت با خطا مواجه شد");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✖</button>
        <h3>ویرایش نوبت</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateAppointment();
          }}
        >
          {/* انتخاب بیمار */}
          <div>
            <label htmlFor="patientId">نام بیمار:</label>
            <select
              id="patientId"
              value={formData.patientId}
              onChange={(e) =>
                setFormData({ ...formData, patientId: Number(e.target.value) })
              }
            >
              <option value={0} disabled>انتخاب بیمار</option>
              {patientList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* انتخاب برنامه پزشک */}
          <div>
            <label htmlFor="doctorScheduleId">برنامه پزشک:</label>
            <select
              id="doctorScheduleId"
              value={formData.doctorScheduleId}
              onChange={(e) =>
                setFormData({ ...formData, doctorScheduleId: Number(e.target.value) })
              }
            >
              <option value={0} disabled>انتخاب برنامه پزشک</option>
              {scheduleList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.doctor.fullName} - {s.doctor.specialty.name} | {s.dayDisplay} ({s.startTime} تا {s.endTime})
                </option>
              ))}
            </select>
          </div>

          {/* دلیل نوبت */}
          <div>
            <label htmlFor="reason">دلیل مراجعه:</label>
            <input
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
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>

          <button type="submit" className="btn-yellow">ثبت تغییرات</button>
        </form>
      </div>
    </div>
  );
}
