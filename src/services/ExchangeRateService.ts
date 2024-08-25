export default {
  async getRates(date: string) {
    try {
      const res = await fetch(
        `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date}&json`
      );
      if (!res.ok) {
        throw new Error('Error!');
      }
      return await res.json();
    } catch (error) {
      console.error(error);
    }
  },
};
