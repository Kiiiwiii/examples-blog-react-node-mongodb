function getProperNameForUrl(name: string) {
  const newName = name.replace(/\s/g, '-');
  return newName;
}

export default getProperNameForUrl;