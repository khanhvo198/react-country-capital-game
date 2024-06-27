import { useState } from "react";

type ButtonState = "DEFAULT" | "SELECTED" | "WRONG";
type Option = {
  value: string;
  state: ButtonState;
};

const getCountries = (data: Record<string, string>) => {
  return Object.keys(data);
};

const getCapitals = (data: Record<string, string>) => {
  return Object.values(data);
};

const randomize = () => Math.random() - 0.5;

export const CountryCapitalGame = ({
  data,
}: {
  data: Record<string, string>;
}) => {
  const countries = getCountries(data);
  const capitals = getCapitals(data);

  const [options, setOptions] = useState<Option[]>(
    [...countries, ...capitals]
      .map((value) => ({
        value,
        state: "DEFAULT",
      }))
      .sort(randomize) as Option[]
  );

  const [selected, setSelected] = useState<Option>();

  const hasWon = options.length === 0;

  const handleOnClick = (option: Option) => {
    if (!selected) {
      setSelected(option);
      setOptions(
        // check in option list and mark this option as "SELECTED"
        options.map((opt: Option) => {
          if (option.value === opt.value) {
            return {
              ...opt,
              state: "SELECTED",
            };
          } else {
            return {
              ...opt,
              state: "DEFAULT",
            };
          }
        })
      );
    } else {
      // if has been selected before
      // check whether it correct or not
      if (
        option.value === data[selected.value] ||
        selected.value === data[option.value]
      ) {
        // if correct, filter pair has correct
        setOptions(
          options.filter((opt: Option) => {
            return !(
              opt.value === option.value || opt.value === selected.value
            );
          })
        );
      } else {
        // if not correct, set pair to WRONG type
        setOptions(
          options.map((opt: Option) => {
            if (opt.value === option.value || opt.value === selected.value) {
              return {
                ...opt,
                state: "WRONG",
              };
            } else {
              return opt;
            }
          })
        );
      }

      setSelected(undefined);
    }
  };

  if (hasWon) {
    return (
      <div className="w-screen h-screen flex justify-center items-center gap-4 bg-slate-900 text-white text-xl">
        Congratulations
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center gap-4 bg-slate-900">
      {options.map((option) => (
        <button
          className={`p-3 rounded-md w-28 ${
            option.state === "SELECTED"
              ? "bg-blue-700"
              : option.state === "WRONG"
              ? "bg-red-700"
              : "bg-blue-200"
          }`}
          key={option.value}
          onClick={() => handleOnClick(option)}
        >
          {option.value}
        </button>
      ))}
    </div>
  );
};
