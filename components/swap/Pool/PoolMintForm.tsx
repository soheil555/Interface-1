import usePairContract from "../../../hooks/usePairContract";
import { Formik, Field, FormikErrors, FormikHelpers } from "formik";
import { Button, Form } from "react-bootstrap";
import { ethers } from "ethers";

interface MintValues {
  to: string;
}

const PoolMintForm = () => {
  const mintInitialValues: MintValues = {
    to: "",
  };

  const pairContract = usePairContract();

  const mint = async (
    values: MintValues,
    actions: FormikHelpers<MintValues>
  ) => {
    if (!pairContract) return;

    try {
      const tx = await pairContract.mint(values.to);
      await tx.wait();
    } catch (error) {
      console.log(error);
    }

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={mintInitialValues}
      onSubmit={mint}
      validate={(values) => {
        const errors: FormikErrors<MintValues> = {};

        if (!ethers.utils.isAddress(values.to)) {
          errors.to = "wallet address is not valid";
        }

        return errors;
      }}
    >
      {({ handleSubmit, errors, touched, isValid, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="col-md-5 m-3">
          <h4>For Minting</h4>
          <Form.Group>
            <Form.Label>Enter Wallet Address:</Form.Label>
            <Field as={Form.Control} type="text" name="to" id="to" />
            <p>{errors.to && touched.to ? errors.to : ""}</p>
          </Form.Group>

          <br />
          <Button
            disabled={!isValid || isSubmitting || !pairContract}
            type="submit"
            className="btn btn-info"
          >
            Mint
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PoolMintForm;
