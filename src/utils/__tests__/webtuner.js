import { summarize } from '../webtuner';


describe('webtuner summerize', () => {
  it('renders correctly', () => {
    const data = [
      {noteName: 'C', octave:2, decibel: 100, residue: 0.1},
      {noteName: 'A', octave:3, decibel: 150, residue: 0.2},
      {noteName: 'B', octave:4, decibel: 200, residue: -0.2},
      {noteName: 'A', octave:2, decibel: 100, residue: -0.3},
      {noteName: 'C', octave:3, decibel: 50, residue: 0.4},
    ];
    const result = summarize(data);
    expect(result).toEqual([
      {noteName: 'A', count: 2, decibelTotal: 250, weightedResidue: 0},
      {noteName: 'B', count: 1, decibelTotal: 200, weightedResidue: -0.2},
      {noteName: 'C', count: 2, decibelTotal: 150, weightedResidue: 0.2}
    ]);
  });
});