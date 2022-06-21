import { Form, Button } from "react-bootstrap";
import { Formik, Field, FormikErrors, FormikHelpers } from "formik";
import useRouterContract from "../../../hooks/useRouterContract";

interface SwapValues {
  amountOut: string;
  path: string[];
  to: string;
  deadline: string;
}

const SwapForm = () => {
  const swapInitialValues: SwapValues = {
    amountOut: "0",
    path: [],
    to: "",
    deadline: "",
  };

  const routerContract = useRouterContract();

  const swapETHForExactTokens = async (
    values: SwapValues,
    actions: FormikHelpers<SwapValues>
  ) => {
    if (!routerContract) return;

    const { amountOut, path, to, deadline } = values;

    try {
      const tx = await routerContract.swapETHForExactTokens(
        amountOut,
        path,
        to,
        deadline
      );
      await tx.wait();
    } catch (error) {
      console.log(error);
    }

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={swapInitialValues}
      onSubmit={swapETHForExactTokens}
      validate={(values) => {
        const errors: FormikErrors<SwapValues> = {};

        return errors;
      }}
    >
      {({ handleSubmit, errors, touched, isValid, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="text-center">
          <h2>SWAP</h2>
          <div style={{ display: "flex" }} className="mb-4">
            <div className="col-md-6 m-1">
              <Form.Group>
                <Form.Label>Enter Amount:</Form.Label>
                <Field
                  as={Form.Control}
                  type="text"
                  name="amountOut"
                  id="amountOut"
                />
                <p>
                  {errors.amountOut && touched.amountOut
                    ? errors.amountOut
                    : ""}
                </p>
              </Form.Group>

              <Form.Group>
                <Form.Label>Enter Path:</Form.Label>
                <Field as={Form.Control} type="text" name="path" id="path" />
                <p>{errors.path && touched.path ? errors.path : ""}</p>
              </Form.Group>
            </div>

            <div className="col-md-6 m-1">
              <Form.Group>
                <Form.Label>Enter Receiver Address:</Form.Label>
                <Field as={Form.Control} type="text" name="to" id="to" />
                <p>{errors.to && touched.to ? errors.to : ""}</p>
              </Form.Group>

              <Form.Group>
                <Form.Label>Enter Deadline:</Form.Label>
                <Field
                  as={Form.Control}
                  type="text"
                  name="deadline"
                  id="deadline"
                />
                <p>
                  {errors.deadline && touched.deadline ? errors.deadline : ""}
                </p>
              </Form.Group>
            </div>
          </div>

          <Button
            disabled={!isValid || isSubmitting || !routerContract}
            type="submit"
            className="btn-main"
          >
            <span id="swapbtn" style={{ display: "" }}>
              SWAP
            </span>
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SwapForm;
