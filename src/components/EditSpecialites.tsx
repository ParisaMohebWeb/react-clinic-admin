import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
type Ispecialites = {
  id: number;
  name: string;
  doctorsCount: number;
};

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditSpecialites({ onClose, onSuccess }: Props) {
  const [newName, setNewName] = useState("");
  const [selectId, setSelectId] = useState<number | null>(null);
  const [item, setItem] = useState<Ispecialites[]>([]);

  const handleEdit = async () => {
    if (!selectId || !newName)
      return toast.error("لطفاً تخصص و نام جدید را وارد کنید");

    try {
      await axios.put(
        `https://nowruzi.top/api/Clinic/specialties/${selectId}`,
        {
          name: newName,
        }
      );
      toast.success("ویرایش با موفقیت انجام شد");
      onSuccess();
      setNewName("");
      setSelectId(null);
      onClose();
    } catch (error) {
      console.log(error, "خطایی رخ داده است");
    }
  };


  useEffect(() => {
    const getSpecialtes = async () => {
      const res = await axios("https://nowruzi.top/api/Clinic/specialties");
      setItem(res.data);
    };
    getSpecialtes();
  }, []);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <select onChange={(e) => setSelectId(Number(e.target.value))}>
        <option value="">انتخاب تخصص</option>
        {item.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <input type="text" placeholder="نام جدید" onChange={(e)=>setNewName(e.target.value)} />
      <button type="button" onClick={handleEdit}>ویرایش</button>
    </form>
  );
}
