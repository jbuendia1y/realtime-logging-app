import { memo } from "react";
import { ISnackbarMessage } from "../contexts/snackbar.context";
import { MdError } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

export const IconBySnackbarVariant = memo(function IconBySnackbarVariant({
  variant,
}: {
  variant: ISnackbarMessage["variant"];
}) {
  if (variant === "error") return <MdError />;
  else if (variant === "info") return <FaCircleInfo />;
  else if (variant === "success") return <FaCheck />;
  else if (variant === "warn") return <IoIosWarning />;
  else return <FaCircleInfo />;
});
