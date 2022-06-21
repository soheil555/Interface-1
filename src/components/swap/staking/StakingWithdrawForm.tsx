import { Form, Button } from "react-bootstrap";
import { Formik, Field, FormikErrors, FormikHelpers } from "formik";
import { BigNumber, ethers } from "ethers";
import useMasterChefContract from "../../../hooks/useMasterchefContract";

interface WithdrawValues {
  pid: string;
  amount: string;
}

const StakingWithdrawForm = () => {
  const withdrawInitialValues: WithdrawValues = {
    pid: "0",
    amount: "0",
  };

  const masterChefContract = useMasterChefContract();

  const withdraw = async (
    values: WithdrawValues,
    actions: FormikHelpers<WithdrawValues>
  ) => {
    if (!masterChefContract) return;

    try {
      const tx = await masterChefContract.withdraw(values.pid, values.amount);
      await tx.wait();
    } catch (error) {
      console.log(error);
    }

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={withdrawInitialValues}
      onSubmit={withdraw}
      validate={(values) => {
        const errors: FormikErrors<WithdrawValues> = {};

        return errors;
      }}
    >
      {({ handleSubmit, errors, touched, isValid, isSubmitting }) => (
        <Form
          onSubmit={handleSubmit}
          style={{ color: "white" }}
          className="col-md-6"
        >
          <h4>Withdraw</h4>
          <Form.Group>
            <Form.Label>Enter Pool Id:</Form.Label>
            <Field as={Form.Control} type="text" id="pid" name="pid" />
            <p>{errors.pid && touched.pid ? errors.pid : ""}</p>
          </Form.Group>

          <Form.Group>
            <Form.Label>Enter Amount:</Form.Label>
            <Field as={Form.Control} type="text" id="amount" name="amount" />
            <p>{errors.amount && touched.amount ? errors.amount : ""}</p>
          </Form.Group>

          <br />
          <Button
            disabled={!isValid || isSubmitting || !masterChefContract}
            type="submit"
            className="btn-info mb-2 col-md-3"
          >
            Withdraw
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default StakingWithdrawForm;
