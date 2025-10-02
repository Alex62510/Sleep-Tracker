"use client";

import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Спите лучше с AI
          </h2>
          <p className="text-lg text-gray-100 mb-8">
            Решения на базе искусственного интеллекта для улучшения качества сна
          </p>
          <Link
            href="#download"
            className="bg-[#1173d4] text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700"
          >
            Начать
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-12 text-gray-100">
            Возможности
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-black rounded-lg shadow hover:shadow-lg transition">
              <div className="text-indigo-600 mb-4 text-4xl">🌙</div>
              <h4 className="text-xl font-semibold mb-2">
                Умное отслеживание сна
              </h4>
              <p className="text-gray-300">
                Отслеживайте фазы сна с помощью AI-аналитики
              </p>
            </div>
            <div className="p-6 bg-black rounded-lg shadow hover:shadow-lg transition">
              <div className="text-indigo-600 mb-4 text-4xl">📊</div>
              <h4 className="text-xl font-semibold mb-2">
                Персональные отчёты
              </h4>
              <p className="text-gray-300">
                Получайте ежедневные и еженедельные отчёты о сне
              </p>
            </div>
            <div className="p-6 bg-black rounded-lg shadow hover:shadow-lg transition">
              <div className="text-indigo-600 mb-4 text-4xl">🧘</div>
              <h4 className="text-xl font-semibold mb-2">
                Руководства для релаксации
              </h4>
              <p className="text-gray-300">
                Доступ к медитациям и программам для расслабления
              </p>
            </div>
            <div className="p-6 bg-black rounded-lg shadow hover:shadow-lg transition">
              <div className="text-indigo-600 mb-4 text-4xl">📱</div>
              <h4 className="text-xl font-semibold mb-2">
                Мобильное приложение
              </h4>
              <p className="text-gray-300">
                Доступно для устройств iOS и Android
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-12 text-gray-100">
            Наша команда
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg shadow hover:shadow-lg transition">
              <Image
                src="/ava.jpeg"
                alt="Участник команды"
                width={300}
                height={300}
                className="rounded-full mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold">Алекс Орлов</h4>
              <p className="text-gray-300">CEO & Founder</p>
            </div>
            <div className="p-6 rounded-lg shadow hover:shadow-lg transition">
              <Image
                src="/ava.jpeg"
                alt="Участник команды"
                width={300}
                height={300}
                className="rounded-full mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold">Алекс Орлов</h4>
              <p className="text-gray-300">CTO</p>
            </div>
            <div className="p-6 rounded-lg shadow hover:shadow-lg transition">
              <Image
                src="/ava.jpeg"
                alt="Участник команды"
                width={300}
                height={300}
                className="rounded-full mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold">Алекс Орлов</h4>
              <p className="text-gray-300">Lead Designer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-12 text-gray-800">
            Отзывы пользователей
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-2 border-[#1173d4] rounded-lg shadow hover:shadow-lg transition">
              <p className="text-gray-100 mb-4">
                "SleepAI изменил мою жизнь! Я просыпаюсь бодрой каждый день."
              </p>
              <h4 className="text-lg font-semibold">Эмма Вильсон</h4>
            </div>
            <div className="p-6 border border-2 border-[#1173d4] rounded-lg shadow hover:shadow-lg transition">
              <p className="text-gray-100 mb-4">
                "Программы для релаксации просто супер. Очень рекомендую!"
              </p>
              <h4 className="text-lg font-semibold">Лиам Браун</h4>
            </div>
            <div className="p-6 border border-2 border-[#1173d4] rounded-lg shadow hover:shadow-lg transition">
              <p className="text-gray-100 mb-4">
                "Лучшее приложение для отслеживания сна с подробными отчётами."
              </p>
              <h4 className="text-lg font-semibold">София Дэвис</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
