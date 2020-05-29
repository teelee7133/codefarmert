import { summarize } from '../webtuner';


describe('webtuner summerize', () => {
  it('renders correctly', () => {
    const data = [
      {noteName: 'C', octave:2, decibel: 100, residue: 0.09},
      {noteName: 'A', octave:3, decibel: 150, residue: 0.01},
      {noteName: 'B', octave:4, decibel: 200, residue: -0.2},
      {noteName: 'A', octave:2, decibel: 140, residue: -0.1},
      {noteName: 'C', octave:3, decibel: 90, residue: 0.2},
    ];
    const result = summarize(data);
    expect(result.map(x => x.noteName)).toEqual(['B', 'A', 'C']);
    expect(result.map(x => x.decibel)).toEqual([
      200,
      150 + Math.log10(1.1) * 10,
      100 + Math.log10(1.1) * 10
    ]);
    const expectedResidue = [-0.2, 0, 0.1]
    result.forEach((x, i) => {
      expect(x.weightedResidue).toBeCloseTo(expectedResidue[i])
    });
  });
});