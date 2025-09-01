import { useEffect, useState } from "react";
import { useAppointmentStore } from "../assets/hooks/AppointmentsStore";
import AddAppointments from "../components/AddAppointments";
import EditAppointment from "../components/EditAppointment";
import axios from "axios";
import { toast } from "react-toastify";
import type { IAppointment } from "../assets/types/appointmentsType";

type AppointmentWithIds = IAppointment & {
  patientId: number;
  doctorScheduleId: number;
};

export default function Appointments() {
  const { appointment, fetchAppointment, isLoading } = useAppointmentStore();
  const [visibleCount, setVisibleCount] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<AppointmentWithIds | null>(null);

  useEffect(() => {
    fetchAppointment();
  }, [fetchAppointment]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("آیا از حذف این نوبت مطمئن هستید؟");
    if (!confirm) return;

    try {
      await axios.delete(`https://nowruzi.top/api/Clinic/appointments/${id}`);
      toast.success("نوبت با موفقیت حذف شد");
      fetchAppointment();
    } catch (error) {
      console.error("خطا در حذف نوبت:", error);
      toast.error("حذف نوبت با خطا مواجه شد");
    }
  };

  const prepareEditItem = (item: IAppointment): AppointmentWithIds => ({
    ...item,
    patientId: item.patient.id,
    doctorScheduleId: item.doctorSchedule.id,
  });

  return (
    <div>
      <div className="title">
        <h2>
          <i className="bi bi-calendar2-minus"></i> لیست نوبت ها
        </h2>
        <button onClick={() => setIsAddModalOpen(true)} className="btn-green">
          <i className="bi bi-plus-circle"></i> افزودن نوبت جدید
        </button>
      </div>

      {isLoading ? (
        <p>در حال بارگذاری...</p>
      ) : (
        <>
          <table className="appointment-tb">
            <thead>
              <tr>
                <th>ردیف</th>
                <th>نام بیمار</th>
                <th>شماره تماس</th>
                <th>شماره نوبت</th>
                <th>تاریخ</th>
                <th>نام پزشک</th>
                <th>تخصص</th>
                <th>بیماری</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {appointment.length > 0 ? (
                appointment.slice(0, visibleCount).map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.patient.fullName}</td>
                    <td>{item.patient.phoneNumber}</td>
                    <td>{item.id}</td>
                    <td>{item.doctorSchedule.dayDisplay}</td>
                    <td>{item.doctorSchedule.doctor.fullName}</td>
                    <td>{item.doctorSchedule.doctor.specialty.name}</td>
                    <td>{item.reason}</td>
                    <td>
                      <button
                        className="btn-green"
                        onClick={() => setEditItem(prepareEditItem(item))}
                      >
                        ویرایش
                      </button>
                      <button
                        className="btn-red"
                        onClick={() => handleDelete(item.id)}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center" }}>
                    نوبتی ثبت نشده است
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {visibleCount < appointment.length && (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <button onClick={handleShowMore} className="btn-blue">
                نمایش بیشتر
              </button>
            </div>
          )}

          {isAddModalOpen && (
            <AddAppointments
              onClose={() => setIsAddModalOpen(false)}
              onSuccess={() => {
                fetchAppointment();
                setIsAddModalOpen(false);
              }}
            />
          )}

          {editItem && (
            <EditAppointment
              appointment={editItem}
              onClose={() => setEditItem(null)}
              onSuccess={() => {
                fetchAppointment();
                setEditItem(null);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
