class Dates {
    formatTime(time) {
      const date = new Date(time);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  
    formatRemainingTime(remainingTime) {
      const hours = Math.floor(remainingTime / 3600);
      const minutes = Math.floor((remainingTime % 3600) / 60);
      const seconds = remainingTime % 60;
      return `${hours}h ${minutes}m ${seconds}s`;
    }
  
    formatNegativeTimeRemaining(remainingTime, id) {
      const negativeTime = Math.abs(remainingTime);
      const hours = Math.floor(negativeTime / 3600);
      const minutes = Math.floor((negativeTime % 3600) / 60);
      const seconds = negativeTime % 60;
      return `ID: ${id} - ${hours}h ${minutes}m ${seconds}s overdue`;
    }
  }
  
  export const dates = new Dates();
  