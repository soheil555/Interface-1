import { Form, Button } from "react-bootstrap";
import { Formik, Field, FormikErrors, FormikHelpers } from "formik";
import useMasterChefContract from "../../../hooks/useMasterchefContract";

interface DepositValues {
  pid: string;
  amount: string;
}

const StakingDepositForm = () => {
  const depositInitialValues: DepositValues = {
    pid: "0",
    amount: "0",
  };

  const masterChefContract = useMasterChefContract();

  const deposit = async (
    values: DepositValues,
    actions: FormikHelpers<DepositValues>
  ) => {
    if (!masterChefContract) return;

    try {
      const tx = await masterChefContract.deposit(values.pid, values.amount);
      await tx.wait();
    } catch (error) {
      console.log(error);
    }

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={depositInitialValues}
      onSubmit={deposit}
      validate={(values) => {
        const errors: FormikErrors<DepositValues> = {};

        return errors;
      }}
    >
      {({ handleSubmit, errors, touched, isValid, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="col-md-6">
          <div style={{ color: "black", textAlign: "center" }}>
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
              as="a"
              disabled={!isValid || isSubmitting || !masterChefContract}
              type="submit"
              className="btn-main mt-3"
            >
              <span>Deposit</span>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StakingDepositForm;
