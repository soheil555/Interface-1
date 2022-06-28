import { Button, Modal, Stack, Form } from "react-bootstrap";
import { Formik, Field, FormikErrors, FormikHelpers } from "formik";
import { useState } from "react";
import SelectToken from "../SelectPair/SelectToken";
import { ethers } from "ethers";

import token1 from "../../../../public/assets/images/token1.png";
import token2 from "../../../../public/assets/images/token2.png";
import useRouterContract from "../../../hooks/useRouterContract";

interface AddLiquidityValues {
  amountA: string;
  amountB: string;
}

const PoolAddLiquidity = () => {
  const [selectedOption1, setSelectedOption1] = useState({
    value: "ETH",
    image: token1,
  });
  const [selectedOption2, setSelectedOption2] = useState({
    value: "Acala",
    image: token2,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addLiquidityInitialValues: AddLiquidityValues = {
    amountA: "0",
    amountB: "0",
  };

  const routerContract = useRouterContract();

  const addLiquidity = async (
    values: AddLiquidityValues,
    actions: FormikHelpers<AddLiquidityValues>
  ) => {
    if (!routerContract) return;

    const { amountA, amountB } = values;

    try {
      //TODO: tokens contracts addresses
      const tx = await routerContract.addLiquidity(
        "",
        "",
        amountA,
        amountB,
        amountA,
        amountB,
        "",
        ""
      );

      await tx.wait();
    } catch (error) {
      console.log(error);
    }

    actions.resetForm();
  };

  return (
    <>
      <Button disabled={!routerContract} onClick={handleShow}>
        <i className="bi bi-plus"></i>Add Liquidity
      </Button>

      <Modal size="lg" centered show={show} onHide={handleClose}>
        <Formik
          initialValues={addLiquidityInitialValues}
          onSubmit={addLiquidity}
          validate={(values) => {
            const errors: FormikErrors<AddLiquidityValues> = {};

            return errors;
          }}
        >
          {({ handleSubmit, errors, touched, isValid, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title className="text-body">Add liquidity</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Stack gap={4}>
                  <Stack
                    gap={5}
                    style={{
                      padding: "40px",
                      backgroundColor: "gray",
                      borderRadius: "10px",
                    }}
                    direction="horizontal"
                  >
                    <Field
                      as={Form.Control}
                      type="text"
                      placeHolder="amount"
                      name="amountA"
                      id="amountA"
                    />
                    <p>
                      {errors.amountA && touched.amountA ? errors.amountA : ""}
                    </p>

                    <SelectToken
                      selectedOption={selectedOption1}
                      optionSelectHandler={setSelectedOption1}
                    />
                  </Stack>

                  <i
                    style={{ fontSize: "30px" }}
                    className="text-body text-xl-center bi bi-plus"
                  ></i>

                  <Stack
                    gap={5}
                    style={{
                      padding: "40px",
                      backgroundColor: "gray",
                      borderRadius: "10px",
                    }}
                    direction="horizontal"
                  >
                    <Field
                      as={Form.Control}
                      placeHolder="amount"
                      name="amountB"
                      id="amountB"
                      type="text"
                    />
                    <p>
                      {errors.amountB && touched.amountB ? errors.amountB : ""}
                    </p>

                    <SelectToken
                      selectedOption={selectedOption2}
                      optionSelectHandler={setSelectedOption2}
                    />
                  </Stack>
                </Stack>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  disabled={!isValid || isSubmitting || !routerContract}
                  type="submit"
                  variant="primary"
                  onClick={handleClose}
                >
                  Add
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default PoolAddLiquidity;
