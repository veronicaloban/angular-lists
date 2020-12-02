export const sortingFunction = <T extends { name: string }>(objectA: T, objectB: T): number => {
  const nameA = objectA.name.toLowerCase();
  const nameB = objectB.name.toLowerCase();

  if (nameA < nameB) {
    return -1;
  }

  if (nameA > nameB) {
    return 1;
  }

  return 0;
};
