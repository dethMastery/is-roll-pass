import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const GamePage = () => {
  const [searchParam, _setSearchParam] = useSearchParams();
  const navigate = useNavigate();

  const [roll, setRoll] = useState<number>(0);
  const [dice, setDice] = useState<number>();

  const diceLimit = Number(searchParam.get("dice")) == 0 ? 6 : 20;

  const rollFunction = () => {
    let rdm = Math.floor(Math.random() * diceLimit) + 1;

    setRoll(rdm);
  };

  const changeDice = () => {
    navigate(`/game?dice=${dice}`);
  };

  useEffect(() => {
    setDice(Number(searchParam.get("dice")));
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <p className="text-3xl">{roll > 0 ? "You need to roll" : ""}</p>
      <h1 className="text-5xl my-6">
        {roll == 0 ? "Click the button to roll.." : roll}
      </h1>
      <p className="text-3xl mb-6">{roll > 0 ? "To pass" : ""}</p>
      <button
        onClick={() => rollFunction()}
        className="px-6 py-4 hover:px-4 bg-living-coral text-whitesmoke rounded-xl text-xl hover:cursor-pointer hover:opacity-75"
      >
        Roll
      </button>

      {/* Button */}
      <div className="w-full absolute top-0 left-0 flex flex-row z-10 px-2 py-4">
        <div className="w-full">
          <button
            className="px-6 py-4 bg-[#fe0000] rounded hover:cursor-pointer hover:opacity-75"
            onClick={() => navigate("/")}
          >
            &lt; Back
          </button>
        </div>
        <div className="w-full flex justify-end gap-4">
          <select
            name="dice"
            id="dice"
            onChange={(e) => setDice(Number(e.target.value))}
            className="border-2 border-solid border-whitesmoke rounded-xl p-4 outline-0 focus:border-living-coral"
          >
            <option selected={dice == 0} value="6">
              D6
            </option>
            <option selected={dice == 20} value="20">
              D20
            </option>
          </select>
          <button
            onClick={() => changeDice()}
            className="px-6 py-4 bg-[#fe6e6f] rounded hover:cursor-pointer hover:opacity-75"
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};
