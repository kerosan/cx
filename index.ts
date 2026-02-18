type ClassValue = string | boolean | null | undefined;
type ClassArgument = ClassValue | ClassValue[] | Record<string, any>;

const onArgument = (item: ClassArgument): string[] => {
  if(!item) return [];

  if(typeof item === "string" && item !== "") {
    return [item];
  }

  if(Array.isArray(item)) {
    return item
      .map(onArgument)
      .flat()
      .filter(Boolean);
  }

  if(typeof item === "object") {
    return Object.entries(item)
      .filter(([, value]) => Boolean(value))
      .map(([key]) => key)
  }

  return [];
};

export const cx = (...classes: ClassArgument[]): string =>
  classes
    .flatMap(onArgument)
    .join(" ");
