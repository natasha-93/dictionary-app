import React from "react";

type DefinitionProps = {
  definition: string;
};

export default function Definition({ definition }: DefinitionProps) {
  return <li>{definition}</li>;
}
