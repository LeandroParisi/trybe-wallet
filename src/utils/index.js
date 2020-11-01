export function returnSeletedDropdown({ nativeEvent }) {
  const { selectedIndex } = nativeEvent.target.options
  const key = nativeEvent.target.name;
  const selected = nativeEvent.target[selectedIndex].value;
  return { key, selected };
}