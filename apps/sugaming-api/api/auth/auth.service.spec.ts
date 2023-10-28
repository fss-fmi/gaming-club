import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { isJWT } from 'class-validator';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  const exampleUserInformation = {
    id: '4b259124-6c9a-454c-b1eb-9aa4716136bb',
    email: 'gosho@losho.com',
    firstName: 'Gosho',
    lastName: 'Losho',
    nickname: 'Reomak',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsersService = {
    verifyCredentials: jest.fn(),
    getByEmail: jest.fn().mockReturnValue(exampleUserInformation),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      providers: [AuthService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser()', () => {
    it('should return user information if the credentials are correct', async () => {
      // Arrange
      mockUsersService.verifyCredentials.mockReturnValue(true);

      // Act
      const result = await service.validateUser(
        'gosho@losho.com',
        'GoshoLoshoTestPassword',
      );

      // Assert
      expect(result).toBeTruthy();
      expect(result).toEqual(exampleUserInformation);
    });

    it('should return null if the credentials are incorrect', async () => {
      // Arrange
      mockUsersService.verifyCredentials.mockReturnValue(false);

      // Act
      const result = await service.validateUser(
        'invalid@email.com',
        'InvalidPass',
      );

      // Assert
      expect(result).toBe(null);
    });
  });

  describe('login()', () => {
    it('should create a valid JWT token with the user email and id', async () => {
      // Act
      const actual = await service.login(exampleUserInformation);

      // Assert
      expect(isJWT(actual.access_token)).toBe(true);
      expect(() => jwtService.verify(actual.access_token)).not.toThrow();

      const tokenInformation = jwtService.verify(actual.access_token);
      expect(tokenInformation.email).toBe(exampleUserInformation.email);
      expect(tokenInformation.sub).toBe(exampleUserInformation.id);
    });
  });
});
