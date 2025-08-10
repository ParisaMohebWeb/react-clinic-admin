import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import AddSpecialites from "../components/AddSpecialites";
type Ispecialites = {
  id: number;
  name: string;
  doctorsCount: number;
};

export default function Specialties() {
  const [specialties, setSpecialties] = useState<Ispecialites[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // فرضی: آدرس API
  const getData = async () => {
    const res = await axios.get("https://nowruzi.top/api/Clinic/specialties");
    console.log(res.data);
    setSpecialties(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  // تقسیم آرایه به گروه‌های سه‌تایی
  const rows = [];
  for (let i = 0; i < specialties.length; i += 3) {
    rows.push(specialties.slice(i, i + 3));
  }

  return isLoading ? (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : (
    <div className="specialites-tb">
      <p>لیست تخصص ها</p>
      <table>
        {rows.map((group, index) => (
          <tr key={index}>
            {group.map((item, idx) => (
              <td key={idx}>{item.name}</td>
            ))}

            {group.length < 3 &&
              Array.from({ length: 3 - group.length }).map((_, i) => (
                <td key={`empty-${i}`}></td>
              ))}
          </tr>
        ))}
      </table>
      <div className="amaliyat">
        <button onClick={() => setIsModalOpen(true)}>افزودن تخصص جدید</button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="افزودن تخصص"
        >
          <AddSpecialites onClose={() => setIsModalOpen(false)} onSuccess={getData} />
        </Modal>
        <button>ویرایش تخصص</button>
        <button>حذف تخصص</button>
      </div>
    </div>
  );
}
