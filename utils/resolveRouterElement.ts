export function resolveRouterElement(
  element: string | string[] | undefined,
  defaultValue: string,
): string {
  if (Array.isArray(element)) {
    return element.length > 0 ? element[0] : defaultValue;
  }
  return element || defaultValue;
}

export default resolveRouterElement;
