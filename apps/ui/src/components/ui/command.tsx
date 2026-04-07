import { useStyle } from "@/lib/style-context";
import {
  Command as DefaultCommand,
  CommandDialog as DefaultCommandDialog,
  CommandInput as DefaultCommandInput,
  CommandList as DefaultCommandList,
  CommandEmpty as DefaultCommandEmpty,
  CommandGroup as DefaultCommandGroup,
  CommandItem as DefaultCommandItem,
  CommandShortcut as DefaultCommandShortcut,
  CommandSeparator as DefaultCommandSeparator,
} from "../ui-default/command";
import {
  Command as LumaCommand,
  CommandDialog as LumaCommandDialog,
  CommandInput as LumaCommandInput,
  CommandList as LumaCommandList,
  CommandEmpty as LumaCommandEmpty,
  CommandGroup as LumaCommandGroup,
  CommandItem as LumaCommandItem,
  CommandShortcut as LumaCommandShortcut,
  CommandSeparator as LumaCommandSeparator,
} from "../ui-luma/command";

function Command(props: React.ComponentProps<typeof DefaultCommand>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCommand {...props} /> : <DefaultCommand {...props} />;
}

function CommandDialog(props: React.ComponentProps<typeof DefaultCommandDialog>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCommandDialog {...props} /> : <DefaultCommandDialog {...props} />;
}

function CommandInput(props: React.ComponentProps<typeof DefaultCommandInput>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCommandInput {...props} /> : <DefaultCommandInput {...props} />;
}

function CommandList(props: React.ComponentProps<typeof DefaultCommandList>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCommandList {...props} /> : <DefaultCommandList {...props} />;
}

function CommandEmpty(props: React.ComponentProps<typeof DefaultCommandEmpty>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCommandEmpty {...props} /> : <DefaultCommandEmpty {...props} />;
}

function CommandGroup(props: React.ComponentProps<typeof DefaultCommandGroup>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCommandGroup {...props} /> : <DefaultCommandGroup {...props} />;
}

function CommandItem(props: React.ComponentProps<typeof DefaultCommandItem>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCommandItem {...props} /> : <DefaultCommandItem {...props} />;
}

function CommandShortcut(props: React.ComponentProps<typeof DefaultCommandShortcut>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaCommandShortcut {...props} />
  ) : (
    <DefaultCommandShortcut {...props} />
  );
}

function CommandSeparator(props: React.ComponentProps<typeof DefaultCommandSeparator>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaCommandSeparator {...props} />
  ) : (
    <DefaultCommandSeparator {...props} />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
