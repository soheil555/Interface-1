import useFactoryContract from "../../../hooks/useFactoryContract";
import { Formik, Field, FormikErrors, FormikHelpers } from "formik";
import { Button, Form } from "react-bootstrap";
import { ethers } from "ethers";

interface CreatePairValues {
  tokenA: string;
  tokenB: string;
}

const PoolCreatePairForm = () => {
  const createPairInitialValues: CreatePairValues = {
    tokenA: "",
    tokenB: "",
  };

  const factoryContract = useFactoryContract();

  const createPair = async (
    values: CreatePairValues,
    actions: FormikHelpers<CreatePairValues>
  ) => {
    if (!factoryContract) return;

    try {
      const tx = await factoryContract.createPair(values.tokenA, values.tokenB);
      await tx.wait();
    } catch (error) {
      console.log(error);
    }

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={createPairInitialValues}
      onSubmit={createPair}
      validate={(values) => {
        const errors: FormikErrors<CreatePairValues> = {};

        if (!ethers.utils.isAddress(values.tokenA)) {
          errors.tokenA = "tokenA address is not valid";
        }

        if (!ethers.utils.isAddress(values.tokenB)) {
          errors.tokenB = "tokenB address is not valid";
        }

        return errors;
      }}
    >
      {({ handleSubmit, errors, touched, isValid, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="col-md-5 m-2 pt-1">
          <h4>Create Pair</h4>

          <Form.Group>
            <Form.Label>Enter Token-A Address:</Form.Label>
            <Field as={Form.Control} type="text" id="tokenA" name="tokenA" />
            <p>{errors.tokenA && touched.tokenA ? errors.tokenA : ""}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label>Enter Token-B Address:</Form.Label>
            <Field as={Form.Control} type="text" name="tokenB" id="tokenB" />
            <p>{errors.tokenB && touched.tokenB ? errors.tokenB : ""}</p>
          </Form.Group>
          <br />
          <Button
            disabled={!isValid || isSubmitting || !factoryContract}
            type="submit"
            className="btn-info"
          >
            Create Pair
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PoolCreatePairForm;
