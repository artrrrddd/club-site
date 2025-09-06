# Настройка UploadThing

## 1. Создание аккаунта UploadThing

1. Перейдите на [uploadthing.com](https://uploadthing.com)
2. Зарегистрируйтесь или войдите в аккаунт
3. Создайте новое приложение

## 2. Получение ключей

После создания приложения вы получите:
- `UPLOADTHING_SECRET` - секретный ключ
- `UPLOADTHING_APP_ID` - ID приложения

## 3. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта и добавьте:

```env
# UploadThing
UPLOADTHING_SECRET=your_uploadthing_secret_here
UPLOADTHING_APP_ID=your_uploadthing_app_id_here

# NextAuth (если еще не настроен)
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## 4. Установка пакетов

```bash
npm install uploadthing @uploadthing/react
```

## 5. Запуск приложения

```bash
npm run dev
```

## 6. Тестирование

1. Откройте `http://localhost:3000/demo/news-form`
2. Попробуйте загрузить изображение
3. Проверьте, что изображение отображается в форме
4. Сохраните новость и проверьте на главной странице

## Особенности

- Максимальный размер файла: 4MB
- Поддерживаемые форматы: JPG, PNG, GIF
- Изображения загружаются в облако UploadThing
- URL изображений сохраняются в базе данных
