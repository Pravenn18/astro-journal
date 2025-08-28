import { format, isToday, isYesterday, isThisWeek, isThisYear } from 'date-fns';

export const formatDate = (date: Date | string, formatString: string = 'EEEE, MMMM do, yyyy'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatString);
};

export const formatTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'h:mm a');
};

export const formatRelativeDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isToday(dateObj)) {
    return 'Today';
  }
  
  if (isYesterday(dateObj)) {
    return 'Yesterday';
  }
  
  if (isThisWeek(dateObj)) {
    return format(dateObj, 'EEEE');
  }
  
  if (isThisYear(dateObj)) {
    return format(dateObj, 'MMMM do');
  }
  
  return format(dateObj, 'MMM do, yyyy');
};

export const getTodayString = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const isDateToday = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return isToday(dateObj);
};
