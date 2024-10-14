import { RHFTextField } from "@/components/react-hook-form";
import FormProvider from "@/components/react-hook-form/hook-form-controller";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/reducers/auth/authApi";
import { setToken } from "@/redux/reducers/auth/authSlice";
import {
  AuthFormValues,
  authValidationSchema,
} from "@/sections/auth/auth-validation";
import { BooleanState } from "@/types/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Alert,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";

interface IAuthModalProps {
  dialog: BooleanState;
}

const AuthSignInDialog = ({ dialog }: IAuthModalProps) => {
  const methods = useForm<AuthFormValues>({
    resolver: zodResolver(authValidationSchema),
  });
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const [loginUser, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      if (response.success) {
        toast.success(response.message);
        dispatch(setToken(response?.data?.accessToken));
        dialog.setFalse();
      } else {
        toast.error(response.message);
        setErrorMessage(response.message);
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.data.message);
      setErrorMessage(error.data.message);
    }
  });

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleSignUpRedirect = () => {
    const currentPath = window.location.href;
    dialog.setFalse(); // Close the modal
    router.push(`/auth/signup?returnTo=${encodeURIComponent(currentPath)}`);
  };

  return (
    <Dialog
      open={dialog.value}
      onClose={dialog.setFalse}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        <h1 className="text-2xl font-semibold">Sign In</h1>
        <IconButton
          aria-label="close"
          onClick={dialog.setFalse}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <h3 className="text-sm pt-1">
            Enter your email and password to Sign In.
          </h3>

          {errorMessage && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {errorMessage}
            </Alert>
          )}

          <div className="w-full mt-8">
            <RHFTextField label="Email" name="email" />
          </div>

          <div className="w-full mt-4">
            <RHFTextField label="Password" type="password" name="password" />
          </div>
          <LoadingButton
            onClick={onSubmit}
            variant="contained"
            loading={isLoading}
            disabled={isLoading}
            fullWidth
            color="success"
            size="large"
            sx={{
              mt: 5,
            }}
          >
            Sign in
          </LoadingButton>
          <div className="mt-7 text-center w-full">
            <div
              onClick={handleSignUpRedirect}
              className="text-sm text-primary hover:underline cursor-pointer"
            >
              Don’t have an account yet? Sign up
            </div>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AuthSignInDialog;
