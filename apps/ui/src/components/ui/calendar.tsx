import { useStyle } from "@/lib/style-context";
import {
  Calendar as DefaultCalendar,
  CalendarDayButton as DefaultCalendarDayButton,
} from "../ui-default/calendar";
import {
  Calendar as LumaCalendar,
  CalendarDayButton as LumaCalendarDayButton,
} from "../ui-luma/calendar";

function Calendar(props: React.ComponentProps<typeof DefaultCalendar>) {
  const { style } = useStyle();
  return style === "luma" ? <LumaCalendar {...props} /> : <DefaultCalendar {...props} />;
}

function CalendarDayButton(props: React.ComponentProps<typeof DefaultCalendarDayButton>) {
  const { style } = useStyle();
  return style === "luma" ? (
    <LumaCalendarDayButton {...props} />
  ) : (
    <DefaultCalendarDayButton {...props} />
  );
}

export { Calendar, CalendarDayButton };
