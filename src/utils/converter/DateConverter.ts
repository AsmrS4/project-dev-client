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

    public formattedDate(dateArray: []) {
        
        const array: any = dateArray.length >= 6 ? dateArray.slice(0, 5) : dateArray
        const date = new Date(...array);
        console.log(dateArray)
        const year = date.getFullYear(); 
        const month = String(date.getMonth()).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        console.log(`${year}-${month}-${day}`)
        return `${year}-${month}-${day}`;

    }
}