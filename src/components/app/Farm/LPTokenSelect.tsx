import { Select } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import useAllPairs from "../../../hooks/useAllPairs";
import useTokenInfo from "../../../hooks/useTokenInfo";

interface LPTokenOptionProps {
  pair: {
    address: string;
    token0: string;
    token1: string;
  };
}

const LPTokenOption = ({ pair }: LPTokenOptionProps) => {
  const token0Info = useTokenInfo(pair.token0);
  const token1Info = useTokenInfo(pair.token1);

  return (
    <option value={pair.address}>
      {token0Info?.symbol}/{token1Info?.symbol} LP token
    </option>
  );
};

const LPTokenSelect = () => {
  const { data: pairs } = useAllPairs();
  const { setFieldValue, setFieldTouched } = useFormikContext();

  return (
    <Select
      placeholder="select LP token"
      onBlur={() => {
        setFieldTouched("lpToken", true);
      }}
      onChange={(e) => {
        setFieldValue("lpToken", e.target.value);
      }}
    >
      {pairs &&
        pairs.map((pair) => {
          return <LPTokenOption key={pair.address} pair={pair} />;
        })}
    </Select>
  );
};

export default LPTokenSelect;
