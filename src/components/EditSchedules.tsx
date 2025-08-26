import { useEffect, useState } from "react";
import type { ISchedule } from "../assets/types/schedulesType";
import axios from "axios";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  selectedItem: ISchedule | null;
}

export default function EditSchedules({ onClose, onSuccess, selectedItem }: Props) {
  const [formData, setFormData] = useState({
    doctorId: 0,
    day: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        doctorId: selectedItem.doctor.id,
        day: selectedItem.day || "",
        startTime: formatTime(selectedItem.startTime),
        endTime: formatTime(selectedItem.endTime),
      });
    }
  }, [selectedItem]);

  // HH:mm:ss -> HH:mm
  function formatTime(time: string | null | undefined) {
    if (!time) return "";
    return time.substring(0, 5); // "10:00:00" -> "10:00"
  }

  // HH:mm -> HH:mm:ss
  function toApiTime(time: string) {
    if (!time) return "";
    return time.length === 5 ? `${time}:00` : time;
  }

  const handleSubmit = async () => {
    if (!selectedItem) return;

    const payload = {
      doctorId: formData.doctorId,
      day: formData.day,
      startTime: toApiTime(formData.startTime),
      endTime: toApiTime(formData.endTime),
    };

    console.log("payload:", payload);

    try {
      await axios.put(
        `https://nowruzi.top/api/Clinic/schedules/${selectedItem.id}`,
        payload
      );
      toast.success('ویرایش انجام شد')
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error updating schedule:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>نام پزشک :</label>
            <input
              className="input-blue"
              type="text"
              readOnly
              value={selectedItem?.doctor.fullName || ""}
            />
          </div>

          <div>
            <label>تاریخ :</label>
            <input
              className="input-blue"
              type="date"
              value={formData.day}
              onChange={(e) => handleChange("day", e.target.value)}
            />
          </div>

          <div>
            <label>زمان شروع :</label>
            <input
              className="input-blue"
              type="time"
            
              value={formData.startTime}
              onChange={(e) => handleChange("startTime", e.target.value)}
            />
          </div>

          <div>
            <label>زمان پایان :</label>
            <input
              className="input-blue"
              type="time"
              value={formData.endTime}
              onChange={(e) => handleChange("endTime", e.target.value)}
            />
          </div>

          <button className="btn-blue" type="button" onClick={handleSubmit}>
            ذخیره
          </button>
        </form>
      </div>
    </div>
  );
}
