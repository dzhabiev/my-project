# Настройка аутентификации Supabase

## Шаг 1: Создать проект в Supabase

1. Перейди на [https://supabase.com](https://supabase.com)
2. Войди или зарегистрируйся
3. Создай новый проект
4. Запомни Database Password (он понадобится)

## Шаг 2: Получить API ключи

1. В Supabase Dashboard, зайди в **Settings** > **API**
2. Скопируй:
   - **Project URL** (например: `https://xxxxx.supabase.co`)
   - **anon public** key (длинный ключ)

## Шаг 3: Добавить в .env.local

Создай файл `.env.local` в корне проекта:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=твой-anon-key
```

## Шаг 4: Настроить Google OAuth (опционально)

### 4.1 Получить Google OAuth credentials

1. Перейди в [Google Cloud Console](https://console.cloud.google.com/)
2. Создай новый проект или выбери существующий
3. Перейди в **APIs & Services** > **Credentials**
4. Нажми **Create Credentials** > **OAuth 2.0 Client ID**
5. Выбери **Web application**
6. Добавь **Authorized redirect URIs**:
   ```
   https://xxxxx.supabase.co/auth/v1/callback
   ```
7. Скопируй **Client ID** и **Client Secret**

### 4.2 Настроить в Supabase

1. В Supabase Dashboard, зайди в **Authentication** > **Providers**
2. Найди **Google** и включи его
3. Вставь **Client ID** и **Client Secret** из Google
4. Сохрани

## Шаг 5: Настроить Email аутентификацию

1. В Supabase Dashboard, зайди в **Authentication** > **Providers**
2. Убедись что **Email** провайдер включен
3. Настрой **Email Templates** (опционально) в **Authentication** > **Email Templates**

## Шаг 6: Настроить Redirect URLs

1. В Supabase Dashboard, зайди в **Authentication** > **URL Configuration**
2. Добавь Site URL:
   - Для локальной разработки: `http://localhost:3000`
   - Для production: `https://your-domain.com`
3. Добавь Redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://your-domain.com/auth/callback`

## Шаг 7: Запустить проект

```bash
npm run dev
```

Перейди на:
- Login: http://localhost:3000/login
- Sign Up: http://localhost:3000/signup
- Pricing: http://localhost:3000/pricing

## Готовые функции

- ✅ Email/Password регистрация и вход
- ✅ Google OAuth вход
- ✅ Автоматическое обновление сессии
- ✅ Защита маршрутов через middleware
- ✅ Отображение профиля пользователя
- ✅ Sign Out функция
- ✅ Страница Pricing с тарифами

## Следующие шаги

1. Настроить защиту API /api/generate (только для залогиненных)
2. Добавить лимиты для бесплатных пользователей
3. Интегрировать платежную систему для Pro плана
4. Создать профиль пользователя (/profile)
5. Добавить историю генераций стикеров

## Troubleshooting

### Ошибка: "Invalid API key"
- Проверь что ключи правильно скопированы в .env.local
- Перезапусти dev сервер после изменения .env.local

### Google OAuth не работает
- Убедись что Redirect URI правильно настроен в Google Cloud Console
- Проверь что Google провайдер включен в Supabase
- URL должен быть точно `https://xxxxx.supabase.co/auth/v1/callback`

### Email confirmation не приходит
- Проверь спам папку
- В Supabase можно отключить email confirmation для разработки в **Authentication** > **Settings**
