import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

import token1 from "../../../public/assets/images/token1.png";
import token2 from "../../../public/assets/images/token2.png";
import token3 from "../../../public/assets/images/token3.png";
import token4 from "../../../public/assets/images/token4.png";
import token5 from "../../../public/assets/images/token5.png";
import token6 from "../../../public/assets/images/token6.png";
import token7 from "../../../public/assets/images/token7.png";
import token8 from "../../../public/assets/images/token8.png";

interface SelectOption {
  value: string;
  image: StaticImageData;
}

interface SelectTokenProps {
  selectedOption: SelectOption;
  optionSelectHandler: (el: SelectOption) => void;
}

const SelectToken = ({
  selectedOption,
  optionSelectHandler,
}: SelectTokenProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [selected, setSelected] = useState(selectedOption);
  const options: SelectOption[] = [
    {
      value: "ETH",
      image: token1,
    },
    {
      value: "Acala",
      image: token2,
    },
    {
      value: "Audius",
      image: token3,
    },
    {
      value: "Binance",
      image: token4,
    },
    {
      value: "Bitcoin",
      image: token5,
    },
    {
      value: "Cardano",
      image: token6,
    },
    {
      value: "Fantom",
      image: token7,
    },
    {
      value: "Axolotl",
      image: token8,
    },
  ];
  useEffect(() => {
    return () => {
      setSelected(selectedOption);
    };
  }, [selectedOption]);

  return (
    <div style={{ position: "relative" }}>
      <span
        className="d-flex align-items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {}
        <img src={selected.image.src} />{" "}
        <span className="token-name">{selected?.value}</span>{" "}
        <FaAngleDown style={{ fontSize: "25px" }} />
      </span>
      <span
        className={`select2-container select2-container--default select2-container--open ${
          isOpen ? "d-block" : "d-none"
        }`}
        style={{ position: "absolute" }}
      >
        <span
          className="select2-dropdown select2-dropdown--below"
          style={{ width: "140.859px" }}
        >
          <span className="select2-search select2-search--dropdown">
            <input
              className="select2-search__field"
              type="search"
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </span>
          <span className="select2-results">
            <ul className="select2-results__options">
              {options.map((el, i) => {
                if (searchKey) {
                  // return el.value == searchKey;
                  if (
                    el.value.toLowerCase().includes(searchKey.toLowerCase())
                  ) {
                    return (
                      <li
                        className="select2-results__option select2-results__option--selectable mb-2"
                        key={i}
                        onClick={() => {
                          optionSelectHandler(el);
                          setSelected(el);
                          setIsOpen(false);
                        }}
                      >
                        <span className="d-flex align-items-center">
                          <img src={el.image.src} />{" "}
                          <span className="token-name">{el.value}</span>{" "}
                        </span>
                      </li>
                    );
                  }
                } else {
                  return (
                    <li
                      className="select2-results__option select2-results__option--selectable mb-2"
                      key={i}
                      onClick={() => {
                        optionSelectHandler(el);
                        setSelected(el);
                        setIsOpen(false);
                      }}
                    >
                      <span className="d-flex align-items-center">
                        <img src={el.image.src} />{" "}
                        <span className="token-name">{el.value}</span>{" "}
                      </span>
                    </li>
                  );
                }
              })}
            </ul>
          </span>
        </span>
      </span>
    </div>
  );
};
export default SelectToken;
