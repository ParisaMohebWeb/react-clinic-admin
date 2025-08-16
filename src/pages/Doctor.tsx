import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ModalRegister from "../components/ModalRegister";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import DeleteDoctor from "../components/ِDeleteDoctor";
import RegisterForm from "../components/RegisterForm";
import EditDoctor from "../components/EditDoctor";
import DoctorSearch from "../components/DoctorSearch";
import { useDoctorStore } from "../assets/hooks/DoctorHook";
import type { IDoctor } from "../assets/types/doctor";

export default function Doctor() {
  const defaultPageSize = 5;
  const { allDoctors, searchedDoctors, searchDone, setAllDoctors,searchPage  } =
    useDoctorStore();

  const [specialties, setSpecialties] = useState<Record<number, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectItem, setSelectItem] = useState<IDoctor | null>(null);

  const GetDocterList = useCallback(async () => {
    try {
      const res = await axios.get("https://nowruzi.top/api/Clinic/doctors");
      const doctors = [...res.data].reverse();
      setAllDoctors(doctors);
      setIsLoading(false);

      const specialtyMap: Record<number, string> = {};
      for (const doctor of doctors) {
        const id = doctor.specialty.id;
        if (!specialtyMap[id]) {
          try {
            const specialtyRes = await axios.get(
              `https://nowruzi.top/api/Clinic/specialties/${id}`
            );
            specialtyMap[id] = specialtyRes.data.name;
          } catch (err) {
            console.log(err);
          }
        }
      }
      setSpecialties(specialtyMap);
    } catch (err) {
      console.log(err, "خطایی در گرفتن داده رخ داده است");
    }
  }, [setAllDoctors]);

  useEffect(() => {
    GetDocterList();
  }, [GetDocterList]);

  // جلوگیری از اسکرول هنگام باز بودن مدال‌ها
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  useEffect(() => {
    document.body.style.overflow = isDeleteModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDeleteModalOpen]);

  useEffect(() => {
    document.body.style.overflow = isEditModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEditModalOpen]);

  // تعیین لیست برای نمایش
  const doctorsToShow = searchDone ? searchedDoctors : allDoctors;

  return isLoading ? (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : (
    <div className="doctor-page">
      <div>
        <div>
          <h3>لیست پزشکان</h3>
          <DoctorSearch />
        </div>
        <button onClick={() => setShowModal(true)} className="btn-green">
          ➕ افزودن پزشک
        </button>
        {showModal && (
          <ModalRegister onClose={() => setShowModal(false)}>
            <RegisterForm
              onClose={() => setShowModal(false)}
              onSuccess={() => {
                toast.success("تخصص اضافه شد");
                GetDocterList();
                setShowModal(false);
              }}
            />
          </ModalRegister>
        )}
      </div>

      <table className="tb-doctor">
        <tbody>
          <tr>
            <th>ردیف</th>
            <th>نام و نام خانوادگی</th>
            <th>شماره تماس</th>
            <th>تخصص</th>
            <th>تعداد نوبت</th>
            <th>عملیات</th>
          </tr>

          {doctorsToShow.map((item, index) => (
            <tr key={item.id}>
              <td> {(searchPage - 1) * defaultPageSize + index + 1}</td>
              <td>{item.fullName}</td>
              <td>{item.phoneNumber}</td>
              <td>{specialties[item.specialty.id] || "در حال بارگذاری..."}</td>
              <td> {item.schedulesCount} </td>

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
                <Modal
                  isOpen={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                  title=""
                >
                  {selectItem && (
                    <DeleteDoctor
                      onClose={() => setIsDeleteModalOpen(false)}
                      onSuccess={GetDocterList}
                      DoctorId={selectItem.id}
                      gender={selectItem.gender}
                      fullName={selectItem.fullName}
                    />
                  )}
                </Modal>
                <button
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setSelectItem(item);
                  }}
                  className="btn-green"
                >
                  <i className="bi bi-pen"></i>{" "}
                </button>
                <Modal
                  isOpen={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                  title=""
                >
                  {selectItem && (
                    <EditDoctor
                      onClose={() => setIsEditModalOpen(false)}
                      onSuccess={GetDocterList}
                      doctorId={selectItem.id}
                      gender={selectItem.gender}
                      fullName={selectItem.fullName}
                      specialtyIdDoctor={selectItem.specialty.id}
                    />
                  )}
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
