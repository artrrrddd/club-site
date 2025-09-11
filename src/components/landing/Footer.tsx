import React from 'react';
import Image from 'next/image';
import vkIcon from '../../app/designComponents/vkIcon.svg';
import tgIcon from '../../app/designComponents/tgIcon.svg';
import s from '../../app/Home.module.css';
import { TitilliumWebSemiBold } from '@/fonts/TitilliumSemiBold';
import { titilliumRegular } from '@/fonts/TitilliumRegular';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/80 backdrop-blur-sm border-t border-gray-800 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Логотип и описание */}
          <div className="space-y-4">
            <h3 className={`${TitilliumWebSemiBold.className} text-2xl font-bold text-white`}>
              комп.<span className="text-crimson">здесь</span>
            </h3>
            <p className={`${titilliumRegular.className} text-gray-300 text-sm`}>
              Киберпространство принципиально нового уровня, созданное для твоих побед
            </p>
          </div>

          {/* Контакты */}
          <div className="space-y-4">
            <h4 className={`${TitilliumWebSemiBold.className} text-lg font-semibold text-white`}>Контакты</h4>
            <div className="space-y-2">
              <a 
                href="tel:+7(950)113-20-15" 
                className="group flex items-center space-x-3 p-3 bg-gray-800 hover:bg-crimson rounded-lg transition-colors duration-200"
              >
                <svg 
                  className="w-5 h-5 text-gray-300 group-hover:text-white group-hover:scale-110 transition-all duration-200" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className={`${titilliumRegular.className} text-gray-300 group-hover:text-white text-sm`}>+7 (950) 113-20-15</span>
              </a>
              
            </div>
          </div>

          {/* Социальные сети */}
          <div className="space-y-4">
            <h4 className={`${TitilliumWebSemiBold.className} text-lg font-semibold text-white`}>Мы в соцсетях</h4>
            <div className="flex space-x-4">
              <a 
                href="https://vk.com/club232470213" 
                target="_blank" 
                rel="noopener noreferrer"
                className={s.socialButton}
              >
                <Image 
                  src={vkIcon} 
                  alt="VKontakte" 
                  className="w-6 h-6"
                />
              </a>
              <a 
                href="https://t.me/ComputerClub2025" 
                target="_blank" 
                rel="noopener noreferrer"
                className={s.socialButton}
              >
                <Image 
                  src={tgIcon} 
                  alt="Telegram" 
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`${titilliumRegular.className} text-gray-400 text-sm`}>
              © 2025 комп.здесь. Все права защищены.
            </p>
            <div className="flex space-x-6 text-sm">
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
