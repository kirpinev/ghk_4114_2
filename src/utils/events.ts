declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export type Payload = {
  one_cashback: number;
  one_baraban: number;
  limit_cashback: number;
  secret_cashback: number;
  online_kino: number;
  sub_music: number;
  internet: number;
  free_pushes: number;
  free_transfer: number;
  free_cash: number;
  alfa_schet: number;
};

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      "https://script.google.com/macros/s/AKfycbwmaRDdSZMjNR3Cjw56j7fIdyJEPqLmlyNjxRr0-Xs9zgn5wjVPHDdTGKgmOjR95lPA/exec",
      {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify({ date, ...payload, variant: "ghk_3579_2" }),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      },
    );
  } catch (error) {
    console.error("Error!", error);
  }
};
