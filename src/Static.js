import React from "react";

export const NotFound = () => (
  <div>
    <h2>Nie znaleziono</h2>
    Niepoprawny adres URL!
  </div>
);

export const Licence = () => (
  <div>
    <h2>Licencje</h2>
    <p>
      Wszystkie obrazy udostępnione na tej stronie zostały wykonane osobiście przez autora stron na bazie fotografii
      udostępnianych na licencji Creative Commons Zero oraz cytatów pozyskanych ze żródeł literaturowych.
    </p>
    <p>
      Tapety są udostępnione również na licencji Creative Commons Zero - wszystkie są darmowe i masz prawo wykorzystać
      je w dowolnych celach
    </p>
  </div>
);

export const CopyrightFooter = () => (
  <div className="text-muted copyright-footer">
    © Designed and owned by <a href="http://bergsoft.pl">BergSoft Maciej Baranowski</a>
  </div>
);
