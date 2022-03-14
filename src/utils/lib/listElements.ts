export const loginElements = [
  {
    title: "Email",
    placeholder: "Email",
    name: "email",
    type: "email",
  },
  {
    title: "Password",
    placeholder: "••••••••",
    name: "password",
    type: "Password",
    minLength: 6,
  },
];
export const Hour = [
  { value: "00", label: "12 AM", hourType: "AM", hour: "12" },
  { value: "1", label: "1 AM", hourType: "AM", hour: "1" },
  { value: "2", label: "2 AM", hourType: "AM", hour: "2" },
  { value: "3", label: "3 AM", hourType: "AM", hour: "3" },
  { value: "4", label: "4 AM", hourType: "AM", hour: "4" },
  { value: "5", label: "5 AM", hourType: "AM", hour: "5" },
  { value: "6", label: "6 AM", hourType: "AM", hour: "6" },
  { value: "7", label: "7 AM", hourType: "AM", hour: "7" },
  { value: "8", label: "8 AM", hourType: "AM", hour: "8" },
  { value: "9", label: "9 AM", hourType: "AM", hour: "9" },
  { value: "10", label: "10 AM", hourType: "AM", hour: "10" },
  { value: "11", label: "11 AM", hourType: "AM", hour: "11" },
  { value: "12", label: "12 PM", hourType: "PM", hour: "12" },
  { value: "13", label: "1 PM", hourType: "PM", hour: "1" },
  { value: "14", label: "2 PM", hourType: "PM", hour: "2" },
  { value: "15", label: "3 PM", hourType: "PM", hour: "3" },
  { value: "16", label: "4 PM", hourType: "PM", hour: "4" },
  { value: "17", label: "5 PM", hourType: "PM", hour: "5" },
  { value: "18", label: "6 PM", hourType: "PM", hour: "6" },
  { value: "19", label: "7 PM", hourType: "PM", hour: "7" },
  { value: "20", label: "8 PM", hourType: "PM", hour: "8" },
  { value: "21", label: "9 PM", hourType: "PM", hour: "9" },
  { value: "22", label: "10 PM", hourType: "PM", hour: "10" },
  { value: "23", label: "11 PM", hourType: "PM", hour: "11" },
];
export const time = [
  { value: "00", label: "00" },
  { value: "05", label: "05" },
  { value: "10", label: "10" },
  { value: "15", label: "15" },
  { value: "20", label: "20" },
  { value: "25", label: "25" },
  { value: "30", label: "30" },
  { value: "35", label: "35" },
  { value: "40", label: "40" },
  { value: "45", label: "45" },
  { value: "50", label: "50" },
  { value: "55", label: "55" },
];
export const defaultHour = (hour: number) => {
  return Hour.filter((i) => {
    return Number(i.value) == hour;
  });
};
export const defaultMinute = (minute: number) => {
  return time.filter((i) => {
    return Number(i.value) == minute;
  });
};
export const headerTitles = [
  { pathname: "/", title: "Home", navbar: false },
  { pathname: "/summary", title: "Summary", navbar: true },
  { pathname: "/waybill", title: "Waybill", navbar: true },
  { pathname: "/upcomings", title: "Upcomings", navbar: true },
  { pathname: "/inbox", title: "Inbox", navbar: true },
  { pathname: "/statistics", title: "Statistics", navbar: true },
  { pathname: "/notified/[id]", title: "Notified", navbar: false },
  { pathname: "/activedrive/[id]", title: "Active Drive", navbar: false },
  { pathname: "/summary/[id]", title: "Summary", navbar: true },
  { pathname: "/changePassword", title: "Change Password", navbar: true },
  { pathname: "/account", title: "Account Edit", navbar: true },
];
export const filterPaths = [
  { pathname: "/notified/[id]", status: "notified" },
  { pathname: "/drive/[id]", status: "drive" },
  { pathname: "/charging/[id]", status: "charging" },
  { pathname: "/active/[id]", status: "active" },
];
export function colorFilter(color: string) {
  return colorPalet.filter((i) => {
    return i.value === color;
  });
}
export const colorPalet = [
  { value: "all", color: "text-gray-300 font-semibold" },
  { value: "confirmed", color: "text-green-500 font-semibold" },
  { value: "completed", color: "text-green-500 font-semibold" },
  { value: "ongoing", color: "text-gray-500 font-semibold" },
  { value: "cancelled", color: "text-red-500 font-semibold" },
];
