import { useEffect, useState } from "react";
import AddSchedules from "../components/AddSchedules";
import DeleteSchedules from "../components/DeleteSchedules";
import EditSchedules from "../components/EditSchedules";
import SchedulesSearch from "../components/SchedulesSearch";
import { useScheduleStore } from '../assets/hooks/SchedulesStore';
import type {ISchedule} from '../assets/types/schedulesType'

export default function Schedules() {
  const { schedules, fetchSchedules} = useScheduleStore();
  const [searchResults, setSearchResults] = useState<ISchedule[] | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectItem, setSelectItem] = useState<ISchedule | null>(null);


  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);


  
  const dataToShow = searchResults || schedules;
  const sortedSchedules = [...dataToShow].sort(
    (a, b) => new Date(a.dayDisplay).getTime() - new Date(b.dayDisplay).getTime()
  );
  
  

  return(
    <div>
      <div className="title">
        <h2>
          <i className="bi bi-calendar2-minus"></i> لیست برنامه ها
        </h2>
        <button onClick={() => setIsAddModalOpen(true)} className="btn-green">
          <i className="bi bi-plus-circle"></i> افزودن برنامه
        </button>
      </div>

      <SchedulesSearch onResults={setSearchResults} 
      />

      <table className="scheduels-tb">
        <tbody>
          <tr>
            <th>ردیف</th>
            <th>نام پزشک</th>
            <th>تخصص</th>
            <th>روز</th>
            <th>ساعت شروع</th>
            <th>ساعت پایان</th>
            <th>تعداد نوبت</th>
            <th>فعال</th>
            <th>عملیات</th>
          </tr>

          {sortedSchedules.slice(0, visibleCount).map((item, index) => (
            <tr key={item.id || index}>
              <td>{index + 1}</td>
              <td>{item.doctor.fullName}</td>
              <td>{item.doctor.specialty.name}</td>
              <td>{item.dayDisplay}</td>
              <td>{item.startTimeDisplay}</td>
              <td>{item.endTimeDisplay}</td>
              <td>{item.appointmentsCount}</td>
              <td>{item.isAvailable ? "ظرفیت موجود" : "تکمیل ظرفیت"}</td>
              <td>
                <i
                  className="bi bi-trash"
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setSelectItem(item);
                  }}
                ></i>
                <i
                  className="bi bi-pen"
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setSelectItem(item);
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {visibleCount < dataToShow.length && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button className="btn-blue" onClick={() => setVisibleCount((p) => p + 10)}>
            نمایش بیشتر
          </button>
        </div>
      )}

      {isAddModalOpen && (
        <AddSchedules
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={fetchSchedules} // Zustand handle می‌کنه
        />
      )}
      {isDeleteModalOpen && selectItem && (
        <DeleteSchedules
          onClose={() => setIsDeleteModalOpen(false)}
          onSuccess={fetchSchedules}
          selectedItem={selectItem}
        />
      )}
      {isEditModalOpen && selectItem && (
        <EditSchedules
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={fetchSchedules}
          selectedItem={selectItem}
        />
      )}
    </div>
  );
}
