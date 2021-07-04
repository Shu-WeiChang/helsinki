import patients from '../../data/patients';
import { NewPatientEntry, PatientsEntry, Entry, NewEntry } from '../../types';
import {v1 as uuid} from 'uuid'

const getNonSensitiveEntries = (): Omit<PatientsEntry, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findById = (id: string): PatientsEntry | undefined => {
  let patient = patients.find(p => p.id === id);

  // if (patient && !patient?.entries) {
  //   patient = {
  //     ...patient,
  //     entries: []
  //   };
  // };

  return patient;
};

const addPatient = ( 
  entry: NewPatientEntry ): PatientsEntry => {
    const newPatientEntry = {
      id: uuid(),
      ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
  };

const addEntry = (patient: PatientsEntry, newEntry: NewEntry): PatientsEntry => {
  const entryToAdd: Entry = {
    ...newEntry,
    id: uuid()
  };

  patient.entries.push(entryToAdd);

  return patient;
};

export default { getNonSensitiveEntries, addPatient, findById, addEntry }
