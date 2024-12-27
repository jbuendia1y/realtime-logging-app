import { PropsWithChildren } from "react";

export const Skeleton = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={
        'animate-pulse relative before:content-[""] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-slate-500 before:rounded-sm'
      }
    >
      {children}
    </div>
  );
};
