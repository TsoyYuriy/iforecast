import moment from "moment";
import { isBeforeDay } from "./isBeforeDay";
import { isSameDay} from 'react-dates';


export const isAfterDay = (a, b) => {
	if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
	return !isBeforeDay(a, b) && !isSameDay(a, b);
}