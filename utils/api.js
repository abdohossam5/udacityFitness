import {AsyncStorage} from 'react-native';
import {CALENDAR_STORAGE_KEY, formatCalendarResults} from './_calendar';

export const fetchCalendar = () => {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
      .then(formatCalendarResults)
}

export const submitEntry = ({key, entry}) => {
    AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
};

export const removeEntry = (key) => {
    AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
      .then((res) => {
        const data = JSON.parse(res);
        data[key] = undefined;
        delete data[key];
        AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
      })
};