import '../global.css';
import '@sugaming/sugaming-ui/global.css';

import React from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { locales } from '../i18n';

export const metadata = {
  title: 'Welcome to sugaming-admin',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = useMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <html lang={locale}>
        <body>{children}</body>
      </html>
    </NextIntlClientProvider>
  );
}
