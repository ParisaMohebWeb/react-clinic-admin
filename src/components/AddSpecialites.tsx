import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
  onSuccess:()=>void
}

export default function AddSpecialites({ onClose,onSuccess }: Props) {
  const [speciality, setSpeciality] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("https://nowruzi.top/api/Clinic/specialties", {
        name: speciality,
      });
      toast.success('موفقیت افزوده شد')
      onSuccess();
      
    } catch (error) {
      console.error("خطا در ارسال:", error);
      toast.error('خطایی رخ داده است')
    }

    // بستن مدال بعد از ارسال
    if (onClose) onClose();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="speciality">نام تخصص :</label>
      <input
        type="text"
        id="speciality"
        value={speciality}
        onChange={(e) => setSpeciality(e.target.value)}
      />

      <button type="button" onClick={handleSubmit}>
        افزودن    </button>
    </form>
  );
}
