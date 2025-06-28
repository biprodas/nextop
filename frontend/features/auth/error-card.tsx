import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { CardWrapper } from "~/features/auth/card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel=""
      headerDescription="Oops! Something went wrong!"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
