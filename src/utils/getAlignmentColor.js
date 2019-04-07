getAlignmentColor.dark = alignment => {
  if (alignment === 'Demon' || alignment === 'Minion') {
    return '#955';
  }
  return '#559';
};

export default function getAlignmentColor(alignment) {
  if (alignment === 'Demon' || alignment === 'Minion') {
    return '#FAA';
  }
  return '#AAF';
}
