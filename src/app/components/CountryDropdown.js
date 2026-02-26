"use client";
import { useState } from "react";
import { FaArrowAltCircleDown, FaArrowDown } from "react-icons/fa";

export default function CountryDropdown({
  countryData,
  countryLoading,
  query,
  setQuery,
  errors,
}) {
  const [open, setOpen] = useState(false);

  const selectedCountry = countryData?.find(
    (c) => c.country_Id === query.countryId
  );

  const handleSelect = (country) => {
    setQuery((prev) => ({
      ...prev,
      countryId: country.country_Id,
    }));
    setOpen(false);
  };

  return (
    <div className="input-container relative">
      {/* Selected Box */}
      <div
        onClick={() => setOpen(!open)}
        className="text-input-field flex items-center justify-between cursor-pointer"
      >
        {selectedCountry ? (
          <div className="flex items-center gap-2">
            <img
              src={selectedCountry.countryFlag} // <-- flag image url
              alt={selectedCountry.country_Name}
              className="w-5 h-5 "
            />
            <span>{selectedCountry.country_Name}</span>
          </div>
        ) : (
          <span className="text-gray-400">Select Country</span>
        )}

        <span className="text-gray-400">▼</span>
        {/* <FaArrowDown/> */}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 w-full bg-white border rounded mt-1 shadow-md max-h-60 overflow-y-auto">
          {countryLoading && (
            <div className="p-2 text-gray-500">Loading...</div>
          )}

          {!countryLoading &&
            countryData?.map((data) => (
              <div
                key={data.country_Id}
                onClick={() => handleSelect(data)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  src={data.countryFlag}
                  alt={data.country_Name}
                  className="w-5 h-5"
                />
                <span>{data.country_Name}</span>
              </div>
            ))}
        </div>
      )}

      {/* Error */}
      {errors.countryId && (
        <p className="text-red-500 text-sm mt-1">
          {errors.countryId}
        </p>
      )}
    </div>
  );
}