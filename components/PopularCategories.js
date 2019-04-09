import React, { Component } from "react";
import Link from "next/link";
import DataProvider from "./DataProvider";

class PopularCategories extends Component {
  constructor() {
    super();
    this.categories = [
      { id: "milosc-milosne-o-milosci", name: "💝 O mi\u0142o\u015bci" },
      { id: "o-mlodosci-mlodosc", name: "👦 O m\u0142odo\u015bci, m\u0142odo\u015b\u0107" },
      { id: "o-kobietach", name: "♀ O kobietach" },
      { id: "o-mezczyznach", name: "♂ O m\u0119\u017cczyznach" },
      { id: "motywujace", name: "🗲 Motywacyjne" },
      { id: "o-sukcesie", name: "🙌 O sukcesie" },
      { id: "o-nadziei", name: "👍 O nadziei" },
      { id: "o-dobru", name: "🕊 O dobru" },
      { id: "o-marzeniach", name: "🌈 O marzeniach" },
      { id: "o-pieknie", name: "🌹 O pi\u0119knie" },
      { id: "o-podrozach", name: "🌴 O podr\u00f3\u017cach" },
      { id: "o-szczesciu", name: "🍀 O szcz\u0119\u015bciu" }
    ];
  }

  render() {
    return (
      <div>
        <h2>Najpopularniejsze kategorie</h2>
        <ul className="three-column list-group">
          {this.categories.map((category, i) => {
            return (
              <Link key={category.id} href={"/?category=" + category.id}>
                <a><li className="list-group-item">{category.name}</li></a>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default PopularCategories;
