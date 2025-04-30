import { convertToX12 } from "./index.mjs";
const json = {
  provider: {
    provider_name: "Dr. John Doe",
    npi: "1234567890",
    taxonomy_code: "207Q00000X",
  },
  patient: {
    patient_id: "9876543210",
    first_name: "Jane",
    last_name: "Doe",
    dob: "1985-06-15",
  },
  claim_details: {
    claim_number: "123456789",
    service_date: "2025-04-20",
    diagnosis_code: "J00",
    procedure_code: "99213",
    amount: 150.0,
  },
  payer: {
    payer_name: "Medicare",
    payer_id: "987654321",
  },
};
convertToX12(json);
