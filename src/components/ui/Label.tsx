import clsx from "clsx";
import { Info } from "lucide-react";
import * as React from "react";

import { Tooltip } from "./Tooltip";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  info?: string;
}

export const Label: React.FC<LabelProps> = ({
  className,
  required = true,
  ...props
}) => (
  <div className="inline-flex justify-start items-center gap-1">
    <label
      className={clsx(
        "block text-sm font-normal text-rspl-neutral-700 dark:text-rspl-neutral-300 leading-none",
        className,
      )}
      {...props}
    />
    {!required && <span className="text-rspl-neutral-500"></span>}
    {props.info && (
      <Tooltip content={props.info} position="top">
        <Info className="size-3.5 inline text-rspl-neutral-300" />
      </Tooltip>
    )}
  </div>
);
