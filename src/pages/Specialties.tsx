import axios from "axios";
import { useEffect, useState } from "react";

type Ispecialites = {
  id: number;
  name: string;
  doctorsCount:number;
};

export default function Specialties() {
  const [specialties, setSpecialties] = useState<Ispecialites[]>([]);
  const[isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    // فرضی: آدرس API
    const getData = async () => {
      const res = await axios.get("https://nowruzi.top/api/Clinic/specialties");
      console.log(res.data);
      setSpecialties(res.data);
      setIsLoading(false)
    };
    getData();
  }, []);

  // تقسیم آرایه به گروه‌های سه‌تایی
  const rows = [];
  for (let i = 0; i < specialties.length; i += 3) {
    rows.push(specialties.slice(i, i + 3));
  }


  return (
  isLoading ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>

  :  <div className="specialites-tb">
      <h3>تخصص ها</h3>
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
    </div>
  );
}
