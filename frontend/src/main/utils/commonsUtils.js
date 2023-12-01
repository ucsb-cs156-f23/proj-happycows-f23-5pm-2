import { toast } from "react-toastify";

export function onDeleteSuccess(message) {
    console.log(message);
    toast(message);
}

export function cellToAxiosParamsDelete(cell) {
    return {
        url: "/api/commons",
        method: "DELETE",
        params: {
            id: cell.row.values["commons.id"]
        }
    }
}

export function commonsNotJoined(commons, commonsJoined) {
    const joinedIdList = commonsJoined.map(c => c.id);
    return commons.filter(f => !joinedIdList.includes(f.id));
}

export function convertToDateTimeLocalString(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString();
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

export function checkGreaterDate(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1 >= d2;
}