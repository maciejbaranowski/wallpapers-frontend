import React from "react"
import Head from "next/head"
import { isEmptyString } from "./utils"

export default (props) => {
  let meta = {
    keywords: "tapety,cytaty,tapety z cytatami,autorzy,o milosci, o szczesciu, o bogu",
    description: "Tapety z cytatmi",
    copyright: "Bergsoft Maciej Baranowski",
    language: "PL"
  }
  let title = "Tapety cytaty - zbiór obrazów z cytatami o szczęściu, miłości, sukcesie, motywacyjne i inne";
  if (!isEmptyString(props.title)) {
    title = String(props.title) + " - TapetyCytaty.pl";
  }
  if (!isEmptyString(props.description)) {
    meta.description = meta.description + " " + String(props.description);
  }
  if (!isEmptyString(props.keywords)) {
    meta.keywords = String(props.keywords) + "," + meta.keywords;
  }
  return (
    <Head>
      <title>{title}</title>
      {Object.entries(meta).map((metaEntry) => {
        return <meta name={metaEntry[0]} content={metaEntry[1]} key={metaEntry[0]}/>
      })}
    </Head>);
};