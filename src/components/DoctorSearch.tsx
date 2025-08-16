import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useDoctorStore } from "../assets/hooks/DoctorHook";

interface ISearch {
  searchTerm: string;
  specialtyId: number;
  gender: number;
  page?: number;
  pageSize?: number;
}

const defaultPageSize = 5;

export default function DoctorSearch() {
  const {
    setSearchedDoctors,
    resetSearch,
    searchPage,    
    setSearchPage,   
  } = useDoctorStore();

  const [searchItem, setSearchItem] = useState<ISearch>({
    searchTerm: "",
    specialtyId: 0,
    gender: 0,
  });
  const [selectedField, setSelectedField] =
    useState<keyof ISearch>("searchTerm");
  const [specialties, setSpecialties] = useState<{ id: number; name: string }[]>(
    []
  );
  const [hasNextPage, setHasNextPage] = useState(false);
  const [noResult, setNoResult] = useState(false);

  // دریافت لیست تخصص‌ها
  useEffect(() => {
    axios.get("https://nowruzi.top/api/Clinic/specialties").then((res) => {
      setSpecialties(res.data);
    });
  }, []);

  // درخواست به API
  const fetchDoctors = useCallback(
    async (params: Partial<ISearch>) => {
      try {
        const response = await axios.get(
          "https://nowruzi.top/api/Clinic/doctors/search",
          { params }
        );
        setSearchedDoctors(response.data);
        setNoResult(response.data.length === 0);
        setHasNextPage(response.data.length === defaultPageSize);
        return response.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("خطا در جستجو", err);
        }
      }
    },
    [setSearchedDoctors]
  );

  // منطق جستجو
  const searchDoctors = useCallback(() => {
    const isEmpty =
      !searchItem.searchTerm.trim() &&
      searchItem.specialtyId === 0 &&
      searchItem.gender === 0;

    if (isEmpty) {
      resetSearch();
      setNoResult(false);
      setHasNextPage(false);
      return;
    }

    const params: Partial<ISearch> = {};
    if (searchItem.searchTerm.trim())
      params.searchTerm = searchItem.searchTerm.trim();
    if (searchItem.specialtyId !== 0)
      params.specialtyId = searchItem.specialtyId;
    if (searchItem.gender !== 0) params.gender = searchItem.gender;

    params.page = searchPage;          
    params.pageSize = defaultPageSize;

    fetchDoctors(params);
  }, [searchItem, searchPage, resetSearch, fetchDoctors]);

  // اجرای جستجو هنگام تغییر صفحه یا شرط‌ها
  useEffect(() => {
    searchDoctors();
  }, [searchDoctors]);

  // تغییر نوع فیلد جستجو
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.value as keyof ISearch;
    setSelectedField(field);

    // ریست کامل
    setSearchItem({ searchTerm: "", specialtyId: 0, gender: 0 });
    setSearchPage(1);    
    resetSearch();
    setNoResult(false);
    setHasNextPage(false);
  };

  // ورودی متن
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchItem((prev) => ({ ...prev, [selectedField]: value }));
    setSearchPage(1);

    if (value.trim() === "") {
      resetSearch();
      setNoResult(false);
      setHasNextPage(false);
    }
  };

  // انتخاب تخصص
  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setSearchItem((prev) => ({ ...prev, specialtyId: value }));
    setSearchPage(1);

    if (value === 0) {
      resetSearch();
      setNoResult(false);
      setHasNextPage(false);
    }
  };

  // انتخاب جنسیت
  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setSearchItem((prev) => ({ ...prev, gender: value }));
    setSearchPage(1);

    if (value === 0) {
      resetSearch();
      setNoResult(false);
      setHasNextPage(false);
    }
  };

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSearchPage(1);
  }, [setSearchPage]);

  const searchIsActive =
    searchItem.searchTerm.trim() ||
    searchItem.specialtyId !== 0 ||
    searchItem.gender !== 0;

  return (
    <div>
      <h5>جستجو بر اساس:</h5>
      <form onSubmit={handleSubmit} className="search-form">
        <div>
          <label>
            <input
              type="radio"
              value="searchTerm"
              name="searchBox"
              checked={selectedField === "searchTerm"}
              onChange={handleRadioChange}
            />{" "}
            نام پزشک
          </label>
          <label>
            <input
              type="radio"
              value="specialtyId"
              name="searchBox"
              checked={selectedField === "specialtyId"}
              onChange={handleRadioChange}
            />{" "}
            تخصص
          </label>
          <label>
            <input
              type="radio"
              value="gender"
              name="searchBox"
              checked={selectedField === "gender"}
              onChange={handleRadioChange}
            />{" "}
            جنسیت
          </label>
        </div>

        <div>
          {selectedField === "specialtyId" ? (
            <select
              value={searchItem.specialtyId}
              onChange={handleSpecialtyChange}
              className="input-blue"
            >
              <option value={0}>انتخاب تخصص</option>
              {specialties.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          ) : selectedField === "gender" ? (
            <select
              value={searchItem.gender}
              onChange={handleGenderChange}
              className="input-blue"
            >
              <option value={0}>همه</option>
              <option value={1}>مرد</option>
              <option value={2}>زن</option>
            </select>
          ) : (
            <input
              value={String(searchItem[selectedField])}
              onChange={handleInputChange}
              className="input-blue"
              type="text"
              placeholder="🔎 جستجوی پزشک"
            />
          )}
        </div>
      </form>

      {noResult && <p className="text-error">هیچ نتیجه‌ای یافت نشد</p>}

      {/* صفحه‌بندی فقط وقتی جستجو فعال هست و حداقل یک صفحه معتبر داریم */}
      {!noResult && searchIsActive && (hasNextPage || searchPage > 1) && (
        <div>
          <button
            className="btn-circle"
            type="button"
            disabled={searchPage === 1}
            onClick={() => setSearchPage(Math.max(1, searchPage - 1))}
          >
            <i className="bi bi-arrow-right-circle-fill"></i>
          </button>
          <span>صفحه {searchPage}</span>
          <button
            className="btn-circle"
            type="button"
            disabled={!hasNextPage}
            onClick={() => setSearchPage(searchPage + 1)}
          >
            <i className="bi bi-arrow-left-circle-fill"></i>
          </button>
        </div>
      )}
    </div>
  );
}
