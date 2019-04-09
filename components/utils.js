export const isEmptyString = x => {
  return !x || x.length === 0;
};

export const setPageTitle = additionalString => {
  if (isEmptyString(additionalString)) {
    document.title = "Tapety cytaty - zbiór obrazów z cytatami o szczęściu, miłości, sukcesie, motywacyjne i inne";
  } else {
    document.title = String(additionalString) + " - TapetyCytaty.pl";
  }
};
