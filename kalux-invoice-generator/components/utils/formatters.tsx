export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('de-CH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}


export const formatCurrency = (amount: number): string => {
    return `CHF ${amount.toFixed(2)}`;  
}