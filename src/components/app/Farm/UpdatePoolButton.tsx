import { Button, Tooltip, useToast } from "@chakra-ui/react";
import { useState } from "react";
import useMasterChefContract from "../../../hooks/useMasterChefContract";

interface UpdatePoolButtonProps {
  pid: number;
}

const UpdatePoolButton = ({ pid }: UpdatePoolButtonProps) => {
  const toast = useToast();
  const masterChefContract = useMasterChefContract();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePool = async () => {
    if (!masterChefContract) return;

    setIsLoading(true);

    try {
      const tx = await masterChefContract.updatePool(pid, {
        gasLimit: "1000000",
      });
      await tx.wait();

      toast({
        title: "Update pool",
        description: "Pool updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Update pool",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };

  return (
    <Tooltip
      hasArrow
      textAlign="center"
      label="Update reward variables of the given pool to be up-to-date"
      fontSize="md"
    >
      <Button
        isDisabled={!masterChefContract}
        isLoading={isLoading}
        onClick={handleUpdatePool}
        variant="ghost"
      >
        Update Pool
      </Button>
    </Tooltip>
  );
};

export default UpdatePoolButton;
