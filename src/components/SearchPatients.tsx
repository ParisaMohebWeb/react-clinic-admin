import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { usePatientsStore } from "../assets/hooks/PatientsHook";

interface ISearch {
  searchTerm: string;
  nationalCode: string;
  gender: number;
  page?: number;
  pageSize?: number;
}

const defaultPageSize = 5;

export default function SearchPatients() {
  const { setSearchedPatients, resetSearch, searchPage, setSearchPage } =
    usePatientsStore();

  const [searchItem, setSearchItem] = useState<ISearch>({
    searchTerm: "",
    nationalCode: "",
    gender: 0,
  });
  const [selectedField, setSelectedField] =
    useState<keyof ISearch>("searchTerm");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [noResult, setNoResult] = useState(false);

  // درخواست به API
  const fetchPatients = useCallback(
    async (params: Partial<ISearch>) => {
      try {
        const response = await axios.get(
          "https://nowruzi.top/api/Clinic/patients/search",
          { params }
        );
        setSearchedPatients(response.data);
        setNoResult(response.data.length === 0);
        setHasNextPage(response.data.length > defaultPageSize);
        return response.data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("خطا در جستجو", err);
        }
      }
    },
    [setSearchedPatients]
  );

  // منطق جستجو
  const SearchPatients = useCallback(() => {
    const isEmpty =
      !searchItem.searchTerm.trim() &&
     !searchItem.nationalCode.trim() &&
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
    if (searchItem.nationalCode.trim())
      params.nationalCode = searchItem.nationalCode;
    if (searchItem.gender !== 0) params.gender = searchItem.gender;

    params.page = searchPage;
    params.pageSize = defaultPageSize;

    fetchPatients(params);
  }, [searchItem, searchPage, resetSearch, fetchPatients]);

  // اجرای جستجو هنگام تغییر صفحه یا شرط‌ها
  useEffect(() => {
    SearchPatients();
  }, [SearchPatients]);

  // تغییر نوع فیلد جستجو
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.value as keyof ISearch;
    setSelectedField(field);

    // ریست کامل
    setSearchItem({ searchTerm: "", nationalCode: "", gender: 0 });
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

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSearchPage(1);
    },
    [setSearchPage]
  );

  const searchIsActive =
    searchItem.searchTerm.trim() ||
    searchItem.nationalCode.trim() ||
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
            نام بیمار
          </label>
          <label>
            <input
              type="radio"
              value="nationalCode"
              name="searchBox"
              checked={selectedField === "nationalCode"}
              onChange={handleRadioChange}
            />{" "}
            کدملی
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
          {selectedField === "nationalCode" ? (
            <input
              value={String(searchItem[selectedField])}
              onChange={handleInputChange}
              className="input-blue"
              type="text"
              placeholder="🔎 جستجوی بیمار"
            />
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
              placeholder="🔎 جستجوی بیمار"
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
