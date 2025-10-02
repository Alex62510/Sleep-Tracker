"use client";

import Link from "next/link";

export default function Contact() {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col overflow-x-hidden"
      style={{ fontFamily: '"Public Sans", sans-serif' }}
    >
      {/* Основной контент */}
      <main className="container mx-auto flex-1 px-6 py-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Левая часть: Форма */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tighter ">
                Свяжитесь с нами
              </h2>
              <p>
                Мы всегда готовы помочь! Если у вас есть вопросы или нужна
                поддержка, заполните форму ниже. Мы стараемся отвечать в течение
                24 часов.
              </p>
            </div>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium " htmlFor="name">
                  Ваше имя
                </label>
                <input
                  className="form-input flex w-full rounded-lg border border-2 border-[#1173d4] p-3 placeholder:text-gray-500 focus:border-white focus:ring-0"
                  id="name"
                  placeholder="Введите ваше имя"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium " htmlFor="email">
                  Ваш Email
                </label>
                <input
                  className="form-input flex w-full rounded-lg border border-2 border-[#1173d4] p-3 placeholder:text-gray-500 focus:ring-0"
                  id="email"
                  placeholder="Введите ваш email"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium " htmlFor="subject">
                  Тема обращения
                </label>
                <input
                  className="form-input flex w-full rounded-lg border border-2 border-[#1173d4] p-3 placeholder:text-gray-500 focus:ring-0"
                  id="subject"
                  placeholder="Введите тему обращения"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium " htmlFor="message">
                  Сообщение
                </label>
                <textarea
                  className="form-input flex w-full min-h-[140px] rounded-lg border border-2 border-[#1173d4] p-3 placeholder:text-gray-500 focus:ring-0"
                  id="message"
                  placeholder="Опишите ваш вопрос или проблему"
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg border border-2 border-[#1173d4] px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                Отправить
              </button>
            </form>
          </div>

          {/* Правая часть */}
          <div className="space-y-12">
            <div className="rounded-lg p-8">
              <h3 className="text-2xl font-bold ">Часто задаваемые вопросы</h3>
              <p className="mt-2 ">
                Найдите ответы на популярные вопросы о DreamWell, включая советы
                по устранению неполадок, управлению аккаунтом и многое другое.
              </p>
              <button className="mt-6 flex items-center gap-2 rounded-lg cursor-pointer px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105">
                <span>Посетить Центр помощи</span>
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </button>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-bold ">Свяжитесь с поддержкой</h3>
              <p>
                Если вам нужна срочная помощь или вы хотите связаться напрямую с
                представителем поддержки, используйте email или телефон.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <p className="font-medium ">Email</p>
                    <a
                      href="mailto:eagle62510@gmail.com"
                      className="transition-colors"
                    >
                      AlexOrlov@support.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                    <span className="material-symbols-outlined">phone</span>
                  </div>
                  <div>
                    <p className="font-medium ">Телефон</p>
                    <a href="tel:+375291111111" className="transition-colors">
                      +375 (29) 111-1111
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
