import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
  id?: number;
  name?: string;
}

export default function RemoveSpecialites({ onClose, onSuccess }: Props) {
  const [specialityId, setSpecialityId] = useState("");
  const [item, setItem] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const getSpecialites = async () => {
      const res = await axios.get("https://nowruzi.top/api/Clinic/specialties");
      setItem(res.data);
    };
    getSpecialites();
  }, []);

  // api حذف تخصص
  const handleSubmit = async () => {
    try {
      await axios.delete(
        `https://nowruzi.top/api/Clinic/specialties/${specialityId}`
      );
      toast.success("حذف با موفقیت انجام شد");
      onSuccess();
    } catch (error) {
      console.error("خطا در ارسال:", error);
      toast.error("تخصصی که پزشک دارد نمیشود حذف کرد");
    }

    // بستن مدال بعد از ارسال
    if (onClose) onClose();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <select
        value={specialityId}
        onChange={(e) => setSpecialityId(e.target.value)}
      >
        <option value=""> انتخاب تخصص</option>
        {item.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <button type="button" onClick={handleSubmit}>
        حذف
      </button>
    </form>
  );
}
