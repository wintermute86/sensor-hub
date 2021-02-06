import React from "react";
import { CardContainerProps } from "../props";
import { Card } from "./Card";

export function CardContainer({ data }: CardContainerProps) {
  return (
    <div className="flex-container direction-column">
      <Card data={data} label={"Wemos D1 Mini"} />
    </div>
  );
}
