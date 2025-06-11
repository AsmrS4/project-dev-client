export class DateConverter {

    public convertToLocaleString(dateStr: string) {
        const date: Date = new Date(dateStr);
        return date.toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    public convertToISO(date: string) {
        const monthNames: string[] = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        const parts = date.split(' ');
        const day = parseInt(parts[0]);
        const month = monthNames.indexOf(parts[1]); 
        const year = parseInt(parts[2]);

        const dateObj: Date = new Date(year, month, day);

        return dateObj.toISOString().split('T')[0]; 
    }
}