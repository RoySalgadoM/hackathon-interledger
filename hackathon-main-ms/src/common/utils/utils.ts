export function maskId(id: string): string {
  if (!id) return '';
  const start = id.slice(0, 4);
  const end = id.slice(-4);
  return `${start}....${end}`;
}

export function mapToValueLabel<T>(
  data: T[],
  valueKey: keyof T,
  labelKey: keyof T
): { value: string; label: string }[] {
  return data.map((item) => ({
    value: String(item[valueKey]),
    label: String(item[labelKey])
  }));
}

export function mapToValueLabelObj<T>(
  data: T[],
  valueKey: keyof T,
  labelKey: keyof T
): { value: T[keyof T]; label: T[keyof T] }[] {
  return data.map((item) => ({
    value: item[valueKey],
    label: item[labelKey]
  }));
}
