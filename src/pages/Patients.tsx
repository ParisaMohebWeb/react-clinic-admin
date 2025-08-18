import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditPatients from "../components/EditPatients";
import { usePatientsStore } from "../assets/hooks/PatientsHook";
import type { patientsType } from "../assets/types/patientsType";
import PatientDetails from "../components/PatientDetails";
import DeletePatient from "../components/ِDeletePatient";
import SearchPatients from "../components/SearchPatients";
import AddPatient from "../components/addPatient";

export default function Patients() {
  const defaultPageSize = 10;
  const { allPatients, searchedPatients, searchDone, setAllPatients } =
    usePatientsStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectItem, setSelectItem] = useState<patientsType | null>(null);
  const [visibleCount, setVisibleCount] = useState(defaultPageSize);
  const [isDetailsModalOpen, setIsDitailsModalOpen] = useState(false);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  

  const GetPatientList = useCallback(async () => {
    try {
      const res = await axios.get("https://nowruzi.top/api/Clinic/patients");
      const patients = [...res.data].reverse();
      setAllPatients(patients);
      setIsLoading(false);
    } catch (err) {
      console.error("خطا در گرفتن لیست بیماران:", err);
    }
  }, [setAllPatients]);

  useEffect(() => {
    GetPatientList();
  }, [GetPatientList]);

  useEffect(() => {
    const isAnyModalOpen = isAddPatientModalOpen || isDeleteModalOpen || isEditModalOpen;
    document.body.style.overflow = isAnyModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAddPatientModalOpen, isDeleteModalOpen, isEditModalOpen]);

  const patientsToShow = searchDone ? searchedPatients : allPatients;
  const patientsVisible = patientsToShow.slice(0, visibleCount);

  return isLoading ? (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : (
    <div className="patient-page">
      <div>
        <div>
          <h3>لیست بیماران</h3>
          <SearchPatients/>
        </div>
        <button onClick={() => setIsAddPatientModalOpen(true)} className="btn-green">
          ➕ افزودن بیمار
        </button>
        {isAddPatientModalOpen &&  (
            <AddPatient
              onClose={() => setIsAddPatientModalOpen(false)}
              onSuccess={() => {
                toast.success("بیمار اضافه شد");
                GetPatientList();
              }}
            patient={selectItem}

            />
        )}
      </div>

    <div>
        <table>
        <tbody>
          <tr>
            <th>ردیف</th>
            <th>نام و نام خانوادگی</th>
            <th>سن</th>
            <th>کدملی</th>
            <th>شماره تماس</th>
            <th>تعداد نوبت</th>
            <th>جزئیات </th>
            <th>عملیات</th>
          </tr>

          {patientsVisible.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.fullName}</td>
              <td>{item.age}</td>
              <td>{item.nationalCode}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.appointmentsCount}</td>
              <td>
                {" "}
                <i
                  onClick={() => {
                    setIsDitailsModalOpen(true);
                    setSelectItem(item);
                  }}
                  className="bi bi-three-dots"
                ></i>{" "}
              </td>

              <td>
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(true);
                    setSelectItem(item);
                  }}
                  className="btn-red"
                >
                  <i className="bi bi-trash"></i>
                </button>
                <button
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setSelectItem(item);
                  }}
                  className="btn-green"
                >
                  <i className="bi bi-pen"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      {visibleCount < patientsToShow.length && (
        <div className="show-more">
          <button
            onClick={() => setVisibleCount((prev) => prev + defaultPageSize)}
            className="btn-blue"
          >
            نمایش بیشتر
          </button>
        </div>
      )}

      {/* مدال حذف */}

        {selectItem && isDeleteModalOpen && (
          <DeletePatient
            onClose={() => setIsDeleteModalOpen(false)}
            onSuccess={GetPatientList}
            patient={selectItem}
          />
        )}

      {/* مدال ویرایش بیمار */}

      {isEditModalOpen && selectItem && (
        <EditPatients
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={GetPatientList}
          patient={selectItem}
        />
      )}

      {/* مدال جزئیات بیشتر بیمار */}

      {isDetailsModalOpen && selectItem && (
        <PatientDetails
          onClose={() => setIsDitailsModalOpen(false)}
          patient={selectItem}
        />
      )}
    </div>
  );
}
