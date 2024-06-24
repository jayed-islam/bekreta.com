import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Radio,
  FormControlLabel,
  Box,
  Grid,
} from "@mui/material";

interface Address {
  id: string;
  type: string;
  district: string;
  division: string;
  subdistrict: string;
  detailedAddress: string;
  details: string;
}

interface AddressCardProps {
  address: Address;
  selectedValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  selectedValue,
  handleChange,
}) => {
  return (
    <div className="w-full">
      <Card sx={{ mb: 2, borderRadius: "1rem" }}>
        <Box p={1.5}>
          <FormControlLabel
            value={address.id}
            control={
              <Radio
                checked={selectedValue === address.id}
                onChange={handleChange}
              />
            }
            label={address.type}
          />
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {`District: ${address.district}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Subdistrict: ${address.subdistrict}`}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="line-clamp-1 overflow-ellipsis"
            >
              {address.detailedAddress}
            </Typography>
          </Box>
        </Box>
      </Card>
    </div>
  );
};

export default AddressCard;
