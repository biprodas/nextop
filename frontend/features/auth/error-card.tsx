import { LuTriangleAlert } from "react-icons/lu";
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
        <LuTriangleAlert className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
