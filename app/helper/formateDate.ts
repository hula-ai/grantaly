import moment from 'moment-timezone';


export function formatDate(dateString: string): string {
    const date = new Date(dateString);
  
    // Use toLocaleDateString to format the date
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  
    return date.toLocaleDateString("en-US", options);
  }



  export const formatTime = (dateTimeString) => {
    // Convert the input UTC time to local time using moment
    const localTime = moment.utc(dateTimeString).local();
    
    // Format the time to a 12-hour format with AM/PM
    return localTime.format('hh:mm A');
  };
  
