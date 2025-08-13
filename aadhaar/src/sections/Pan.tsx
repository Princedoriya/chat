import React, { useState } from "react";

const PanVerificationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    typeOfOrganisation: "",
    panNumber: "",
    nameAsPerPan: "",
    dobOrDoi: "",
    consent: false,
  });

  const [errors, setErrors] = useState({
    typeOfOrganisation: "",
    panNumber: "",
    nameAsPerPan: "",
    dobOrDoi: "",
    consent: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    let formErrors = {
      typeOfOrganisation: "",
      panNumber: "",
      nameAsPerPan: "",
      dobOrDoi: "",
      consent: "",
    };
    let isValid = true;

    // Type of Organisation
    if (!formData.typeOfOrganisation) {
      formErrors.typeOfOrganisation = "Please select an organisation type.";
      isValid = false;
    }

    // PAN Number
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!formData.panNumber) {
      formErrors.panNumber = "PAN number is required.";
      isValid = false;
    } else if (!panRegex.test(formData.panNumber.toUpperCase())) {
      formErrors.panNumber = "Invalid PAN format (e.g., ABCDE1234F).";
      isValid = false;
    }

    // Name as per PAN
    if (!formData.nameAsPerPan) {
      formErrors.nameAsPerPan = "Name is required.";
      isValid = false;
    }

    // DOB or DOI
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!formData.dobOrDoi) {
      formErrors.dobOrDoi = "DOB or DOI is required.";
      isValid = false;
    } else if (!dateRegex.test(formData.dobOrDoi)) {
      formErrors.dobOrDoi = "Date must be in DD/MM/YYYY format.";
      isValid = false;
    }

    // Consent
    if (!formData.consent) {
      formErrors.consent = "You must give consent to proceed.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="max-w-4xl mt-[26px] mb-[26px] mx-auto bg-white rounded-lg shadow border border-gray-200">
      {/* Header */}
      <div className="bg-green-600 text-white px-4 py-2 rounded-t-lg font-semibold">
        PAN Verification
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Row 1 */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-black font-semibold mb-1 text-sm">
              3. Type of Organisation / संगठन के प्रकार
            </label>
            <select
              name="typeOfOrganisation"
              value={formData.typeOfOrganisation}
              onChange={handleChange}
              className={`w-full border ${
                errors.typeOfOrganisation ? "border-red-500" : "border-gray-300"
              } text-gray-500 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300`}
            >
              <option value="">Type of Organisation / संगठन के प्रकार</option>
              <option value="proprietorship">Proprietorship</option>
              <option value="partnership">Partnership</option>
              <option value="company">Company</option>
              <option value="self">Self</option>
              <option value="others">Others</option>
            </select>
            {errors.typeOfOrganisation && (
              <p className="text-red-500 text-xs mt-1">
                {errors.typeOfOrganisation}
              </p>
            )}
          </div>

          <div>
            <label className="block text-black font-semibold mb-1 text-sm">
              4.1 PAN / पैन
            </label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              placeholder="ENTER PAN NUMBER"
              className={`w-full border ${
                errors.panNumber ? "border-red-500" : "border-gray-300"
              } text-gray-500 rounded px-3 py-2 text-sm uppercase focus:outline-none focus:ring focus:ring-blue-300`}
            />
            {errors.panNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.panNumber}</p>
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-black font-semibold mb-1 text-sm">
              4.1.1 Name of PAN Holder / पैन धारक का नाम
            </label>
            <input
              type="text"
              name="nameAsPerPan"
              value={formData.nameAsPerPan}
              onChange={handleChange}
              placeholder="Name as per PAN"
              className={`w-full border ${
                errors.nameAsPerPan ? "border-red-500" : "border-gray-300"
              } text-gray-500 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300`}
            />
            {errors.nameAsPerPan && (
              <p className="text-red-500 text-xs mt-1">
                {errors.nameAsPerPan}
              </p>
            )}
          </div>

          <div>
            <label className="block text-black font-semibold mb-1 text-sm">
              4.1.2 DOB or DOI as per PAN / पैन के अनुसार जन्म तिथि या निगममन तिथि
            </label>
            <input
              type="text"
              name="dobOrDoi"
              value={formData.dobOrDoi}
              onChange={handleChange}
              placeholder="DD/MM/YYYY"
              className={`w-full border ${
                errors.dobOrDoi ? "border-red-500" : "border-gray-300"
              } text-gray-500 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300`}
            />
            {errors.dobOrDoi && (
              <p className="text-red-500 text-xs mt-1">{errors.dobOrDoi}</p>
            )}
          </div>
        </div>

        {/* Consent */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="mt-1"
          />
          <p className="text-sm text-gray-700">
            I, the holder of the above PAN, hereby give my consent to Ministry of
            MSME, Government of India, for using my data/ information available
            in the Income Tax Returns filed by me, and also the same available in
            the GST Returns and also from other Government organizations, for
            MSME classification and other official purposes, in pursuance of the
            MSMED Act, 2006.
          </p>
        </div>
        {errors.consent && (
          <p className="text-red-500 text-xs mt-1">{errors.consent}</p>
        )}

        {/* Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            PAN Validate
          </button>
        </div>
      </form>
    </div>
  );
};

export default PanVerificationForm;
