import React from 'react';
import { InstrumentType } from '../types';
import { INSTRUMENTS } from '../data/notes';

interface InstrumentSelectorProps {
  selectedInstrument: InstrumentType;
  onInstrumentChange: (instrument: InstrumentType) => void;
}

const InstrumentSelector: React.FC<InstrumentSelectorProps> = ({ 
  selectedInstrument, 
  onInstrumentChange 
}) => {
  return (
    <div className="instrument-selector">
      <label htmlFor="instrument-select">Choose Instrument:</label>
      <select 
        id="instrument-select"
        value={selectedInstrument}
        onChange={(e) => onInstrumentChange(e.target.value as InstrumentType)}
        className="instrument-dropdown"
      >
        {Object.values(INSTRUMENTS).map((instrument) => (
          <option key={instrument.id} value={instrument.id}>
            {instrument.name} - {instrument.description}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InstrumentSelector;