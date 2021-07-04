import diagnosesEntries from '../../data/diagnoses';
import { DiagnosesEntry } from '../../types';

const getEntries = (): Array<DiagnosesEntry> => {
  return diagnosesEntries;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};
