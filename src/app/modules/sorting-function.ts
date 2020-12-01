/* eslint-disable @typescript-eslint/ban-types,@typescript-eslint/no-unsafe-assignment,
@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,
*/
export const sortingFunction = <T>(getNameProperty: (object: T) => String) => (objectA: T, objectB: T): number => {
  const nameA = getNameProperty(objectA).toLowerCase();
  const nameB = getNameProperty(objectB).toLowerCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};
