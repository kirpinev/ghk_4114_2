declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export type Payload = {
  plan_name: string;
};

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      "https://script.google.com/macros/s/AKfycbwAhSLvtD2NS7tOi2wqhkl5YRn4sTS4qVOgrUTrFaOlERMWN8osYjRL1G-R4NwYqkUZvg/exec",
      {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify({ date, ...payload, variant: "ghk_4114_2" }),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      },
    );
  } catch (error) {
    console.error("Error!", error);
  }
};
