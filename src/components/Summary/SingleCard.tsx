import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colorFilter } from "@utils/lib/listElements";
import React from "react";
interface ISingleCard {
  icon: IconProp;
  color: string;
  title: string;
  value: string;
}
const SingleCard: React.FC<ISingleCard> = ({ icon, color, title, value }) => {
  return (
    <div className="flex flex-col justify-center lg:block">
      <div className={`mb-2 font-semibold ${color} `}>{title}</div>
      <div className={`${title.includes("Stop") && "mb-2"}`}>
        <div className="w-3 inline-block">
          <FontAwesomeIcon icon={icon as IconProp} className="text-gray-400" />
        </div>
        <span className={`ml-3 ${colorFilter(value)[0]?.color}`}>
          {value} {title === "Stops Wait Time" ? "Mins" : null}
        </span>
      </div>
    </div>
  );
};

export default SingleCard;
