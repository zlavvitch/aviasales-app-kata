class AviaSalesService {
  _apiURL = "https://aviasales-test-api.kata.academy/";

  // eslint-disable-next-line class-methods-use-this
  getId = async (url) => {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        if (res.status === 500) {
          throw new Error("500", "Ошибка на сервере!");
        }
      }

      const data = await res.json();

      return data;
    } catch (err) {
      throw err.message;
    }
  };
}

export default AviaSalesService;
