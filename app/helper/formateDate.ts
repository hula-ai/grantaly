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