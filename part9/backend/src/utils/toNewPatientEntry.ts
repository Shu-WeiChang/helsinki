import { 
  NewPatientEntry, Gender, Entry, 
  DiagnosesEntry, HealthCheckRating, SickLeaves, 
  Discharge, NewEntry, BaseEntry
} from "../../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

const isDate = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const isEntryType = (entry: any): entry is Entry => {
  const healthCheck: boolean = entry.type === "HealthCheck";
  const occupationalHealthcare: boolean =
    entry.type === "OccupationalHealthcare";
  const hospital: boolean = entry.type === "Hospital";

  return healthCheck || occupationalHealthcare || hospital;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries) {
    return entries;
  };
  if (entries.map((entry: any) => !isEntryType(entry))) {
    throw new Error("Incorrect or missing entries: " + entries);
  }
  return entries;
};

const isValidNewEntryType = (entry: any): entry is NewEntry => {
  const healthCheck: boolean = entry.type === "HealthCheck";
  const occupationalHealthcare: boolean =
    entry.type === "OccupationalHealthcare";
  const hospital: boolean = entry.type === "Hospital";

  return healthCheck || occupationalHealthcare || hospital;
};

const parseEntry = (entry: any): NewEntry => {
  if (!entry || !isValidNewEntryType(entry)) {
    throw new Error("Incorrect or missing entry type: " + entry);
  }

  return entry;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation")
  }

  return occupation;
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing comment");
  }

  return name;
}

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date: " + dateOfBirth);
  }
  return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description: " + description);
  }

  return description;
}

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing description: " + specialist);
  }

  return specialist;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (
    rating === "undefined" ||
    rating === null ||
    !isHealthCheckRating(rating)
  ) {
    throw new Error("Incorrect or missing health check rating: " + rating);
  }
  return rating;
};

const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing employername");
  }
  return name;
};

const parseDischargeCriteria = (criteria: any): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing discharge criteria");
  }
  return criteria;
};

const parseDischarge = (discharge: any): Discharge => {
  if (
    !discharge ||
    (Object.keys(discharge).length === 0 && discharge.constructor === Object)
  ) {
    return discharge;
  } else {
    if (!discharge.date) {
      throw new Error("Incorrect or missing discharge-date");
    }
    if (!discharge.criteria) {
      throw new Error("Incorrect or missing discharge-criteria");
    }
    const dischargeDate = parseDate(discharge.date);
    const dischargeCriteria = parseDischargeCriteria(discharge.criteria);

    return {
      date: dischargeDate,
      criteria: dischargeCriteria,
    };
  }
};

const parseSickLeave = (sickleave: any): SickLeaves => {
  if (
    !sickleave ||
    (Object.keys(sickleave).length === 0 && sickleave.constructor === Object)
  ) {
    return sickleave;
  } else {
    if (!sickleave.startDate) {
      throw new Error("Incorrect or missing start date for sickleave");
    }
    if (!sickleave.endDate) {
      throw new Error("Incorrect or missing end date for sickleave");
    }
    const startDate = parseDate(sickleave.startDate);
    const endDate = parseDate(sickleave.endDate);

    return {
      startDate,
      endDate,
    };
  }
};

const parseDiagnosisCode = (diagnosisCode: any): Array<DiagnosesEntry["code"]> => {
  if (!diagnosisCode) return diagnosisCode;

  if (!Array.isArray(diagnosisCode)) {
    throw new Error("Incorrect diagnosisCode");
  }

  const validDiagnosisCodes = diagnosisCode.every((code: any) =>
    isString(code)
  );

  if (validDiagnosisCodes) {
    return diagnosisCode;
  } else {
    throw new Error("Incorrect diagnosisCode");
  }
};

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type Fields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
  entries: unknown
}

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries } : Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries) || []
  };

  return newEntry;
};

export const toNewEntry = (newEntry: any): NewEntry => {
  let validEntryType = parseEntry(newEntry);
  if (!validEntryType) throw new Error("Entry not valid");

  let entry: Omit<BaseEntry, "id"> = {
    date: parseDate(validEntryType.date),
    description: parseDescription(validEntryType.description),
    specialist: parseSpecialist(validEntryType.specialist),
    diagnosisCodes: parseDiagnosisCode(validEntryType.diagnosisCodes),
  };

  switch (validEntryType.type) {
    case "Hospital":
      return {
        ...entry,
        type: validEntryType.type,
        discharge: parseDischarge(validEntryType.discharge),
      };
    case "HealthCheck":
      return {
        ...entry,
        type: validEntryType.type,
        healthCheckRating: parseHealthCheckRating(
          validEntryType.healthCheckRating
        ),
      };
    case "OccupationalHealthcare":
      return {
        ...entry,
        type: validEntryType.type,
        employerName: parseEmployerName(validEntryType.employerName),
        sickLeave: parseSickLeave(validEntryType.sickLeave),
      };
    default:
      return assertNever(validEntryType);
  }
};

// export default toNewPatientEntry;
