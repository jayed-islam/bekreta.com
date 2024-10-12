import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setDeliveryOption } from "@/redux/reducers/cart/cartSlice";

const deliveryOptions = [
  {
    value: "insideDhaka",
    label: "ঢাকা সিটির ভিতরে",
    price: "৭০ টাকা",
  },
  {
    value: "outsideDhaka",
    label: "ঢাকার সিটির বাহিরে",
    price: "১৩০ টাকা",
  },
  // {
  //   value: "homeDelivery",
  //   label: "হোম ডেলিভারি",
  //   price: "১২০ টাকা",
  // },
];

const DeliveryOptionsComponent = () => {
  const dispatch = useAppDispatch();

  const selectedDeliveryOption = useAppSelector(
    (state) => state.cart.selectedDeliveryOption
  );

  const handleDeliveryOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setDeliveryOption(e.target.value));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="body2" gutterBottom>
        ডেলিভারি অপশন নির্বাচন করুন
      </Typography>
      <div className="border border-gray-400 shadow rounded-lg p-3 w-full">
        <RadioGroup
          value={selectedDeliveryOption}
          onChange={handleDeliveryOptionChange}
          sx={{
            width: "100%",
          }}
        >
          {deliveryOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              sx={{ width: "100%" }}
              control={<Radio />}
              label={
                <h2 className="text-sm">
                  {option.label}{" "}
                  <span className="font-semibold">{option.price}</span>
                </h2>
              }
            />
          ))}
        </RadioGroup>
      </div>
    </Box>
  );
};

export default DeliveryOptionsComponent;
