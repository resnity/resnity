import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { parse } from 'cookie';
import { Response } from 'express';

import { HttpResponse } from '@resnity/backend-common';

import { AuthService } from './auth.service';
import {
  CSRF_TOKEN_COOKIE_NAME,
  ID_TOKEN_COOKIE_NAME,
  LOGIN_SESSION_COOKIE_NAME,
} from './cookie/cookie.constant';
import { LogoutQuery } from './dtos/logout.dto';
import { TokenBody } from './dtos/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  async login(@Res({ passthrough: true }) response: Response) {
    const { loginURL, loginSessionCookie } = this.authService.getLoginData();

    response.setHeader('Set-Cookie', loginSessionCookie);
    return HttpResponse.ok().withData({ redirectURL: loginURL });
  }

  @Get('/logout')
  async logout(
    @Query() query: LogoutQuery,
    @Res({ passthrough: true }) response: Response,
    @Headers('cookie') headerCookie?: string,
  ) {
    const encryptedIDTokenCookie = this.getEncryptedIDTokenCookie(headerCookie);

    const { logoutCookie, logoutURL } = this.authService.getLogoutData({
      encryptedIDToken: encryptedIDTokenCookie,
      returnTo: query.returnTo,
    });

    response.setHeader('Set-Cookie', logoutCookie);
    return HttpResponse.ok().withData({ redirectURL: logoutURL });
  }

  @Post('/token')
  async token(
    @Body() body: TokenBody,
    @Res({ passthrough: true }) response: Response,
    @Headers('cookie') headerCookie?: string,
  ) {
    const encryptedCSRFToken = this.getEncryptedCSRFToken(headerCookie);
    const encryptedLoginSession = this.getEncryptedLoginSession(headerCookie);

    const { csrfToken, tokensCookie } = await this.authService.getTokenData({
      callbackCode: body.code,
      callbackState: body.state,
      encryptedCSRFToken,
      encryptedLoginSession,
    });

    response.setHeader('Set-Cookie', tokensCookie);
    return HttpResponse.ok().withData({
      csrfToken,
      redirectURL: 'http://localhost:3000',
    });
  }

  private getEncryptedCSRFToken(headerCookie?: string): string | undefined {
    const cookie = this.parseHeaderCookie(headerCookie);
    return cookie === undefined ? undefined : cookie[CSRF_TOKEN_COOKIE_NAME];
  }

  private getEncryptedLoginSession(headerCookie?: string): string | undefined {
    const cookie = this.parseHeaderCookie(headerCookie);
    return cookie === undefined ? undefined : cookie[LOGIN_SESSION_COOKIE_NAME];
  }

  private getEncryptedIDTokenCookie(headerCookie?: string): string | undefined {
    const cookie = this.parseHeaderCookie(headerCookie);
    return cookie === undefined ? undefined : cookie[ID_TOKEN_COOKIE_NAME];
  }

  private parseHeaderCookie(headerCookie?: string) {
    return headerCookie === undefined ? undefined : parse(headerCookie);
  }
}
