import axios from "axios";
import { useEffect, useState } from "react";
import type { ISchedule } from "../assets/types/schedulesType";

interface Props {
  onResults: (data: ISchedule[]) => void;
}

interface SearchParams {
  DoctorId?: string;
  FromDate?: string;
  ToDate?: string;
  IsAvailable?: boolean;
  PageSize: number;
}

export default function SchedulesSearch({ onResults }: Props) {
  const [doctorList, setDoctorList] = useState<ISchedule["doctor"][]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isAvailable, setIsAvailable] = useState<null | boolean>(null);
  const [pageSize] = useState(9999); // 👈 همیشه همه نتایج
  const [loading, setLoading] = useState(false);

  // گرفتن لیست پزشکان یکتا
  useEffect(() => {
    const getDoctorList = async () => {
      try {
        const res = await axios.get<ISchedule[]>(
          "https://nowruzi.top/api/Clinic/schedules"
        );
        const doctors = res.data.map((s) => s.doctor);
        const uniqueDoctors = Array.from(
          new Map(doctors.map((d) => [d.id, d])).values()
        );
        setDoctorList(uniqueDoctors);
      } catch (error) {
        console.error("خطا در دریافت لیست پزشکان", error);
      }
    };

    getDoctorList();
  }, []);

  // تابع سرچ
  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const params: SearchParams = { PageSize: pageSize };
      if (selectedDoctorId) params.DoctorId = selectedDoctorId;
      if (fromDate) params.FromDate = fromDate;
      if (toDate) params.ToDate = toDate;
      if (isAvailable !== null) params.IsAvailable = isAvailable;

      const res = await axios.get(
        "https://nowruzi.top/api/Clinic/schedules/search",
        { params }
      );

      const data = "items" in res.data ? res.data.items : res.data;
      onResults(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(
            "API Error:",
            error.response.status,
            error.response.data
          );
        } else {
          console.error("Axios Error:", error.message);
        }
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  };

  return (
    <form
      className="search-box"
      onSubmit={(e) => {
        e.preventDefault();
        fetchSearchResults();
        setSelectedDoctorId("");
        setFromDate("");
        setToDate("");
        setIsAvailable(null);
      }}
    >
      <h2>
        <i className="bi bi-search"></i>
        جستجو
      </h2>


        {/* انتخاب پزشک */}
      <div>
        <label htmlFor="doctorId">نام پزشک : </label>
        <select
          id="doctorId"
          value={selectedDoctorId}
          onChange={(e) => setSelectedDoctorId(e.target.value)}
        >
          <option value="">همه پزشکان</option>
          {doctorList.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.fullName}
            </option>
          ))}
        </select>
      </div>

      {/* تاریخ‌ها */}
      <div>
        <div>
          <label htmlFor="fromDate">از تاریخ : </label>
          <input
            type="text"
            id="fromDate"
            className="input-blue"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            placeholder="yyyy-mm-dd"
          />
        </div>
        <div>
          <label htmlFor="toDate">تا تاریخ : </label>
          <input
            type="text"
            id="toDate"
            className="input-blue"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            placeholder="yyyy-mm-dd"
          />
        </div>
      </div>

      {/* وضعیت */}
      <div>
        <label>ظرفیت : </label>
        <select
          value={isAvailable === null ? "" : String(isAvailable)}
          onChange={(e) =>
            setIsAvailable(
              e.target.value === "" ? null : e.target.value === "true"
            )
          }
        >
          <option value="">همه ظرفیت ها</option>
          <option value="true">ظرفیت موجود</option>
          <option value="false">ظرفیت تکمیل</option>
        </select>
      </div>
    

      {/* دکمه سرچ */}
      <button type="submit" className="btn-blue">
        جستجو
      </button>

      {loading && <p>در حال جستجو...</p>}
    </form>
  );
}
