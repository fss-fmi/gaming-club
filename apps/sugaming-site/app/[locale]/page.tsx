'use client';

import React, { useState } from 'react';
import { ApiClient } from '@sugaming/sugaming-api-client/client';
import { getAuth, login } from '@sugaming/sugaming-api-client/next';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@sugaming/sugaming-ui';

export default function Index() {
  const t = useTranslations('Index');
  const [userInfo, setUserInfo] = useState<ApiClient.UserDto>();

  const handleClick = async () => {
    await login('gosho@losho.com', 'GoshoLoshoTestPassword');
    const res = await ApiClient.UsersApiService.usersControllerGetProfile({
      authorization: await getAuth(),
    });
    setUserInfo(res);
  };

  return (
    <>
      <h1>{t('title')}</h1>

      <button type="button" onClick={handleClick}>
        execute server action
      </button>

      <p>{userInfo?.firstName}</p>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
}
