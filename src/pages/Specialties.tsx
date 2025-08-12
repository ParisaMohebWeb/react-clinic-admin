import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import AddSpecialites from "../components/AddSpecialites";
import RemoveSpecialtes from "../components/RemoveSpecialtes";
import EditSpecialites from "../components/EditSpecialites";
type Ispecialites = {
  id: number;
  name: string;
  doctorsCount: number;
};

export default function Specialties() {
  const [specialties, setSpecialties] = useState<Ispecialites[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // فرضی: آدرس API
  const getData = async () => {
    const res = await axios.get("https://nowruzi.top/api/Clinic/specialties");
    setSpecialties(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  //جلو گیری از اسکرول خوردن صفحه

  useEffect(() => {
    if (isAddModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAddModalOpen]);

  useEffect(() => {
    if (isRemoveModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isRemoveModalOpen]);

  useEffect(() => {
    if (isEditModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEditModalOpen]);



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
        <tbody>
          {rows.map((group, index) => (
            <tr key={index}>
              {group.map((item, idx) => (
                <td key={idx}>
                  {item.name}
                  <p> تعداد دکتر: {item.doctorsCount}</p>
                </td>
              ))}

              {group.length < 3 &&
                Array.from({ length: 3 - group.length }).map((_, i) => (
                  <td key={`empty-${i}`}></td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="amaliyat">
        <button onClick={() => setIsAddModalOpen(true)}>
          افزودن تخصص جدید
        </button>
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="افزودن تخصص"
        >
          <AddSpecialites
            onClose={() => setIsAddModalOpen(false)}
            onSuccess={getData}
          />
        </Modal>

        <button onClick={() => setIsEditModalOpen(true)}>ویرایش تخصص</button>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="ویرایش تخصص"
        >
          <EditSpecialites
            onClose={() => setIsEditModalOpen(false)}
            onSuccess={getData}
          />
        </Modal>

        <button onClick={() => setIsRemoveModalOpen(true)}>حذف تخصص</button>
        <Modal
          isOpen={isRemoveModalOpen}
          onClose={() => setIsRemoveModalOpen(false)}
          title="حذف تخصص"
        >
          <RemoveSpecialtes
            onClose={() => setIsRemoveModalOpen(false)}
            onSuccess={getData}
          />
        </Modal>
      </div>
    </div>
  );
}
