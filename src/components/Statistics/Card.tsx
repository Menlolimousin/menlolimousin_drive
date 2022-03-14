import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CurrencyFormat from "react-currency-format";
interface ICard {
  icon: IconProp;
  title: string;
  count: number;
  bg: string;
  text: string;
}

const Card: React.FC<ICard> = ({ icon, title, count, bg, text }) => {
  return (
    <div className="bg-white border rounded-xl p-4 my-4">
      <div className="flex items-center h-full ">
        <div
          className={`w-8 h-8 mr-4 flex items-center justify-center  rounded-full ${bg} ${text}`}
        >
          <FontAwesomeIcon icon={icon as IconProp} />
        </div>
        <div>
          <h1 className={`text-sm ${text}`}>{title}</h1>
          <span className={`text-sm font-semibold ${text}`}>
            <CurrencyFormat
              value={count}
              displayType={"text"}
              thousandSeparator={true}
              prefix={title == "Monthly Turnover" ? "$" : ""}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
