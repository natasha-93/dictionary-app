import React from "react";
import styles from "./Definition.module.css";

type DefinitionProps = {
  definition: string;
};

export default function Definition({ definition }: DefinitionProps) {
  return <li>{definition} </li>;
}
