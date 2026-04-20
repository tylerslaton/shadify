import * as React from "react";

type NextFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, "action"> & {
  action: string | ((formData: FormData) => void | Promise<void>);
  scroll?: boolean;
  prefetch?: boolean;
  replace?: boolean;
};

const NextForm = React.forwardRef<HTMLFormElement, NextFormProps>(function NextForm(
  { action, scroll, prefetch, replace, ...rest },
  ref,
) {
  if (typeof action === "function") {
    return (
      <form
        ref={ref}
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          void action(data);
        }}
        {...rest}
      />
    );
  }
  return <form ref={ref} action={action} {...rest} />;
});

export default NextForm;
