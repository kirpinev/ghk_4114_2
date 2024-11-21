import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";
import React, { useState } from "react";
import smart from "./assets/smart.png";
import drums from "./assets/drums.png";
import smileArrow from "./assets/smile-arrow.png";
import gift from "./assets/gift.png";
import cashback from "./assets/cashback.png";
import percent from "./assets/percent.png";
import free from "./assets/free.png";
import transfer from "./assets/transfer.png";
import cash from "./assets/cash.png";
import discount from "./assets/discount.png";
import lock from "./assets/lock.png";
import { LS, LSKeys } from "./ls";
import { appSt } from "./style.css";
import { ThxLayout } from "./thx/ThxLayout";
import { Gap } from "@alfalab/core-components/gap";
import { Notification } from "@alfalab/core-components/notification";

interface Product {
  title: string;
  text?: string;
  image: string;
  name: string;
  type: Type;
  lite?: string;
  standard?: string;
  premium?: string;
}

type Type = "lite" | "standard" | "premium";

interface Categories {
  title: string;
  products: Array<Product>;
}

const categories: Array<Categories> = [
  {
    title: "Входит в подписку",
    products: [
      {
        text: "Какой-то текст",
        title: "Бесплатные переводы",
        image: transfer,
        name: "free_transfer",
        type: "lite",
      },
      {
        text: "Какой-то текст",
        title: "Бесплатные уведомления",
        lite: "дебетовые карты",
        standard: "дебетовые карты",
        premium: "дебетовые и кредитные карты",
        image: free,
        name: "free_pushes",
        type: "lite",
      },
      {
        text: "Какой-то текст",
        title: "Секретная подборка партнёров с кэшбэком",
        image: gift,
        name: "secret_cashback",
        type: "lite",
      },
      {
        text: "Какой-то текст",
        title: "+1 топовая категория кэшбэка",
        standard: "5%",
        premium: "7%",
        image: smileArrow,
        name: "one_cashback",
        type: "standard",
      },
      {
        title: "+1 попытка крутить барабан суперкэшбэка",
        text: "Какой-то текст",
        image: drums,
        name: "one_baraban",
        type: "standard",
      },
      {
        title: "Увеличенный лимит кэшбэка",
        standard: "7 000 ₽/мес.",
        premium: "10 000 ₽/мес.",
        image: cashback,
        name: "limit_cashback",
        type: "standard",
        text: "Какой-то текст",
      },
      {
        title: "+1% годовых по накопительному счёту",
        text: "Какой-то текст",
        image: percent,
        name: "percent",
        type: "standard",
      },
      {
        title: "Бесплатное снятие наличных",
        standard: "до 200 000 ₽",
        premium: "Безлимит",
        image: cash,
        name: "free_cash",
        type: "standard",
        text: "Какой-то текст",
      },
      {
        title: "Скидка 20% на комиссию на бирже",
        image: discount,
        name: "discount",
        type: "standard",
        text: "Какой-то текст",
      },
    ],
  },
];

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [type, setType] = useState<Type>("lite");
  const [isVisible, setIsVisible] = React.useState(false);

  const hideNotification = React.useCallback(() => setIsVisible(false), []);

  const submit = () => {
    setLoading(true);
    Promise.resolve().then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  };

  const setVisibility = (plan: Type, type: Type) => {
    if (plan === "lite" && type === "lite") {
      return true;
    } else if (
      plan === "standard" &&
      (type === "lite" || type === "standard")
    ) {
      return true;
    } else if (
      plan === "premium" &&
      (type === "lite" || type === "standard" || type === "premium")
    ) {
      return true;
    }
    return false;
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <div className={appSt.box}>
          <img src={smart} alt="Картинка Альфа-Смарт" />
          <Typography.TitleResponsive
            tag="h1"
            view="medium"
            font="system"
            weight="bold"
          >
            Альфа-Смарт
          </Typography.TitleResponsive>
        </div>

        <Typography.Text
          view="primary-medium"
          color="primary"
          style={{ textAlign: "center" }}
        >
          Выберите план
        </Typography.Text>
        <div className={appSt.plans}>
          <ButtonMobile
            block
            view={type === "lite" ? "primary" : "secondary"}
            onClick={() => setType("lite")}
            size="xs"
            style={{ padding: "0.5rem" }}
          >
            <span style={{ marginBottom: "1rem", display: "block" }}>Старт</span>
            <b>199 ₽/мес.</b>
          </ButtonMobile>
          <ButtonMobile
            block
            view={type === "standard" ? "primary" : "secondary"}
            onClick={() => setType("standard")}
            size="xs"
            style={{
              padding: "0.5rem",
              opacity: "1",
            }}
          >
            <span style={{ marginBottom: "1rem", display: "block" }}>
              Стандарт
            </span>
            <b>399 ₽/мес.</b>
          </ButtonMobile>
        </div>

        <div className={appSt.products}>
          {categories.map((category) => (
            <React.Fragment key={category.title}>
              <Gap size={8} />
              <Typography.TitleResponsive
                font="system"
                tag="h2"
                weight="bold"
                view="small"
                className={appSt.productsTitle}
              >
                {category.title}
              </Typography.TitleResponsive>
              {category.products.map((product) => (
                <>
                  <div
                    key={product.title}
                    style={{ position: "relative" }}
                    onClick={() => {
                      if (!setVisibility(type, product.type)) {
                        setIsVisible(true);
                      }
                    }}
                  >
                    {!setVisibility(type, product.type) && (
                      <div className={appSt.productLockContainer}>
                        <img src={lock} alt="" width={35} height={35} />
                      </div>
                    )}
                    <div
                      className={appSt.product}
                      style={{
                        ...(!setVisibility(type, product.type) && {
                          border: "2px solid #F2F3F5",
                          opacity: "0.5",
                        }),
                      }}
                    >
                      <div>
                        <Typography.TitleResponsive
                          font="system"
                          view="small"
                          weight="bold"
                          tag="h3"
                          className={appSt.productTitle}
                        >
                          {product.title}
                        </Typography.TitleResponsive>

                        {product[type] && (
                          <Typography.Text
                            view="primary-medium"
                            tag="p"
                            className={appSt.productText}
                          >
                            {product[type]}
                          </Typography.Text>
                        )}
                      </div>
                      <img
                        src={product.image}
                        alt=""
                        width={50}
                        height={50}
                        className={appSt.productIcon}
                      />
                    </div>
                  </div>
                </>
              ))}
            </React.Fragment>
          ))}
        </div>

        <Notification
          badge="negative"
          title="Недоступно в этом плане"
          visible={isVisible}
          offset={16}
          onClose={hideNotification}
          onCloseTimeout={hideNotification}
        />
      </div>

      <Gap size={96} />

      <div className={appSt.bottomBtn}>
        <ButtonMobile loading={loading} block view="primary" onClick={submit}>
          Подключить
        </ButtonMobile>
      </div>
    </>
  );
};
