import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { BooleanState } from "@/types/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { RHFSelect, RHFTextField } from "@/components/react-hook-form";
import { IDivision } from "@/types/address";
import divisions from "@/data/division";
import useLocationSelect from "@/hooks/use-location";
import { setDistrictName } from "@/redux/reducers/featured/featuredProductSlice";

interface Props {
  dialog: BooleanState;
  onSubmit: any;
}

export default function OrderSubmissionFormDialog({ dialog, onSubmit }: Props) {
  const methods = useForm({
    // resolver: zodResolver(checkoutSchema),
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const {
    selectedDivision,
    setSelectedDivision,
    selectedDistrict,
    setSelectedDistrict,
    filteredDistricts,
    filteredSubDistricts,
    setSelectedSubDistrict,
    selectedDivisionName,
    selectedDistrictName,
    selectedSubDistrictName,
  } = useLocationSelect();

  const divisionValue = watch("division");
  const districtValue = watch("district");
  const subDistrictValue = watch("subDistrict");

  useEffect(() => {
    setSelectedDivision(divisionValue || "");
  }, [divisionValue, setSelectedDivision]);

  useEffect(() => {
    setSelectedDistrict(districtValue || "");
    dispatch(setDistrictName(districtValue || ""));
  }, [dispatch, districtValue, setSelectedDistrict]);

  useEffect(() => {
    setSelectedSubDistrict(subDistrictValue || "");
  }, [setSelectedSubDistrict, subDistrictValue]);
  return (
    <React.Fragment>
      <Dialog
        open={dialog.value}
        onClose={dialog.setFalse}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <div className="">
              <RHFTextField name="name" label="Name" />
              <RHFTextField name="phone" label="Phone" />

              <RHFSelect
                name="division"
                label="Division"
                options={Object.values(divisions).map(
                  (division: IDivision) => ({
                    value: division.id,
                    label: division.name,
                  })
                )}
              />

              <RHFSelect
                name="district"
                label="District"
                options={filteredDistricts.map((district) => ({
                  value: district.id,
                  label: district.name,
                }))}
                disabled={!selectedDivision}
              />

              <RHFSelect
                name="subDistrict"
                label="SubDistrict"
                options={filteredSubDistricts.map((subDistrict) => ({
                  value: subDistrict.id,
                  label: subDistrict.name,
                }))}
                disabled={!selectedDistrict}
              />

              <RHFTextField
                name="detailAddress"
                label="Detail Address"
                className="lg:col-span-2"
              />
              <Grid
                container
                sx={{
                  mt: 3,
                }}
                spacing={3}
              >
                <Grid md={4} xs={12} item>
                  <Stack spacing={2}>
                    <div className="rounded-xl border">
                      <div className="p-3 bg-gray-100 border-b rounded-t-xl">
                        <h2 className="text-md font-semibold">Order Summary</h2>
                      </div>
                      <div className="p-3 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <Typography variant="body1">
                            Subtotal ({totalItem} Items)
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            className="font-semibold"
                          >
                            ৳ {subtotal}
                          </Typography>
                        </div>
                        <div className="flex items-center justify-between">
                          <Typography variant="body1">Shipping Fee</Typography>
                          <Typography
                            variant="subtitle1"
                            className="font-semibold"
                          >
                            ৳ {shippingFee}
                          </Typography>
                        </div>
                        <Divider />
                        <div className="flex items-center justify-between">
                          <Typography variant="body1" className="font-semibold">
                            Total
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            className="font-semibold"
                          >
                            ৳ {total}
                          </Typography>
                        </div>

                        <LoadingButton
                          type="submit"
                          size="large"
                          loading={isLoading}
                          className="bg-[rgb(235,106,42)] text-white capitalize w-full py-2 mt-5 rounded-xl hover:bg-[rgb(235,106,42)]"
                        >
                          Place Order
                        </LoadingButton>
                      </div>
                    </div>
                    <div className="bg-gray-100 rounded-xl">
                      <div className="p-3 bg-white border rounded-t-xl">
                        <h2 className="text-md font-semibold">Your Basket</h2>
                      </div>
                      <div className="p-3">
                        {products.map((product, index) => (
                          <CheckoutItem product={product} key={index} />
                        ))}
                      </div>
                    </div>
                  </Stack>
                </Grid>
              </Grid>
            </div>
          </FormProvider>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={dialog.setFalse}>
            Disagree
          </Button>
          <Button onClick={dialog.setTrue} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
