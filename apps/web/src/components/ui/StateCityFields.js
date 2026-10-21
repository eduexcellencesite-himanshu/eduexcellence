"use client";

import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { INDIA_STATES, OTHER_CITY, citiesFor } from "../../lib/indiaLocations";

// State → City pair used by every form. Picking a state fills the city list; an
// "Other" choice reveals a text box so no visitor is stuck. The form keeps owning
// the values: it passes them in and gets `setField(name, value)` calls back, so its
// own validation and submit payload are untouched (city is always a plain string).
export default function StateCityFields({
  state,
  city,
  errors = {},
  setField,
  inputClass,
  labelClass,
  errorClass = "mt-1 text-xs text-red-500",
  required,
}) {
  const cities = citiesFor(state);
  const cityListed = city && cities.includes(city);
  // "Other" stays selected while the visitor types a city that isn't in the list.
  const [other, setOther] = useState(Boolean(city && !cityListed));
  const selectValue = other ? OTHER_CITY : cityListed ? city : "";

  const onState = (e) => {
    setField("state", e.target.value);
    setField("city", "");
    setOther(false);
  };

  const onCity = (e) => {
    if (e.target.value === OTHER_CITY) {
      setOther(true);
      setField("city", "");
    } else {
      setOther(false);
      setField("city", e.target.value);
    }
  };

  const chevron = (
    <KeyboardArrowDownIcon
      sx={{ fontSize: 22, color: "#3A4660" }}
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
    />
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label className={labelClass}>State {required}</label>
        <div className="relative">
          <select name="state" value={state} onChange={onState} className={`${inputClass} appearance-none pr-12`}>
            <option value="">Select state</option>
            {INDIA_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {chevron}
        </div>
        {errors.state && <p className={errorClass}>{errors.state}</p>}
      </div>

      <div>
        <label className={labelClass}>City {required}</label>
        <div className="relative">
          <select
            name="citySelect"
            value={selectValue}
            onChange={onCity}
            disabled={!state}
            className={`${inputClass} appearance-none pr-12 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400`}
          >
            <option value="">{state ? "Select city" : "Select state first"}</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
            {state && <option value={OTHER_CITY}>Other (type your city)</option>}
          </select>
          {chevron}
        </div>
        {other && (
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setField("city", e.target.value)}
            maxLength={40}
            placeholder="Type your city"
            autoComplete="address-level2"
            className={`${inputClass} mt-2`}
            autoFocus
          />
        )}
        {errors.city && <p className={errorClass}>{errors.city}</p>}
      </div>
    </div>
  );
}
