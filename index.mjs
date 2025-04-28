import moment from "moment";

function convertToX12(json) {
  const { provider, patient, claim_details, payer } = json;

  const now = moment();
  const today = now.format("YYYYMMDD");
  const time = now.format("HHmm");

  const ISA = `ISA*00*          *00*          *ZZ*SENDERID       *ZZ*RECEIVERID     *${today.slice(
    2
  )}*${time}*^*00501*000000905*1*T*:~`;
  const GS = `GS*HC*SENDERID*RECEIVERID*${today}*${time}*1*X*005010X222A1~`;
  const ST = `ST*837*0001*005010X222A1~`;
  const BHT = `BHT*0019*00*${claim_details.claim_number}*${today}*${time}*CH~`;

  const NM1_Submitter = `NM1*41*2*${provider.provider_name}*****46*${provider.npi}~`;
  const PER = `PER*IC*${provider.provider_name}*TE*1234567890~`;
  const NM1_Receiver = `NM1*40*2*${payer.payer_name}*****46*${payer.payer_id}~`;

  const HL_Billing = `HL*1**20*1~`;
  const NM1_Provider = `NM1*85*1*${provider.provider_name.split(" ")[1]}*${
    provider.provider_name.split(" ")[0]
  }****XX*${provider.npi}~`;
  const REF = `REF*EI*${provider.npi}~`;

  const HL_Subscriber = `HL*2*1*22*0~`;
  const NM1_Subscriber = `NM1*IL*1*${patient.last_name}*${patient.first_name}****MI*${patient.patient_id}~`;
  const DMG = `DMG*D8*${patient.dob.replace(/-/g, "")}*F~`;

  const CLM = `CLM*${claim_details.claim_number}*${claim_details.amount.toFixed(
    2
  )}***11:B:1*Y*A*Y*Y~`;
  const DTP = `DTP*472*D8*${claim_details.service_date.replace(/-/g, "")}~`;
  const HI = `HI*ABK:${claim_details.diagnosis_code}~`;
  const LX = `LX*1~`;
  const SV1 = `SV1*HC:${
    claim_details.procedure_code
  }*${claim_details.amount.toFixed(2)}*UN*1***1~`;

  const SE = `SE*21*0001~`;
  const GE = `GE*1*1~`;
  const IEA = `IEA*1*000000905~`;

  return [
    ISA,
    GS,
    ST,
    BHT,
    NM1_Submitter,
    PER,
    NM1_Receiver,
    HL_Billing,
    NM1_Provider,
    REF,
    HL_Subscriber,
    NM1_Subscriber,
    DMG,
    CLM,
    DTP,
    HI,
    LX,
    SV1,
    SE,
    GE,
    IEA,
  ].join("\n");
}

export const handler = async (event, context) => {
  const body = event.body;
  console.log("Hello world");
  return {
    status: "success",
    message: "Mock 837 claim successfully created.",
    "test x12 data": convertToX12(body),
    claim_id: "mock-837-123456789",
    x12_claim_data:
      "ISA*00* *00* *ZZ*1234567890 *ZZ*9876543210 *030101*1010*U*00401*000000001*0*P*... (X12 content)",
  };
};
