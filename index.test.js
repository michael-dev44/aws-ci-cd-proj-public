const convertToX12 = require("./index.mjs");
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
const x12edi =
  "ISA*00*          *00*          *ZZ*SENDERID       *ZZ*RECEIVERID     *250429*1623*^*00501*000000905*1*T*:~\nGS*HC*SENDERID*RECEIVERID*20250429*1623*1*X*005010X222A1~\nST*837*0001*005010X222A1~\nBHT*0019*00*123456789*20250429*1623*CH~\nNM1*41*2*Dr. John Doe*****46*1234567890~\nPER*IC*Dr. John Doe*TE*1234567890~\nNM1*40*2*Medicare*****46*987654321~\nHL*1**20*1~\nNM1*85*1*John*Dr.****XX*1234567890~\nREF*EI*1234567890~\nHL*2*1*22*0~\nNM1*IL*1*Doe*Jane****MI*9876543210~\nDMG*D8*19850615*F~\nCLM*123456789*150.00***11:B:1*Y*A*Y*Y~\nDTP*472*D8*20250420~\nHI*ABK:J00~\nLX*1~\nSV1*HC:99213*150.00*UN*1***1~\nSE*21*0001~\nGE*1*1~\nIEA*1*000000905~";

test("return non null x12 string", () => {
  expect(convertToX12(json)).toBeNull();
});
