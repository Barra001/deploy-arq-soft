import { Request, Response } from "express";
import { StocksController } from "./../stock/stocks.controller";
import { StocksServiceInterface } from "./../stock/service/stocks.service.interface";
import { AuthServiceInterface } from "src/auth/service/auth.service.interface";
import { Role } from "../auth/entities/auth.payload";
import { Stock } from "./../stock/entities/stock.entity";

describe("StocksController", () => {
  let controller: StocksController;
  let mockStocksService: StocksServiceInterface;
  let mockAuthService: AuthServiceInterface;
  let mockRequest: Request;
  let mockResponse: Response;

  beforeEach(() => {
    mockStocksService = {
      create: jest.fn(),
      delete: jest.fn(),
      modify: jest.fn(),
      find: jest.fn(),
      findAll: jest.fn(),
    };

    mockAuthService = {
      verifyRequestForRoles: jest.fn(),
      logInAdmin: jest.fn(),
      logInPlayer: jest.fn(),
    };

    mockRequest = { /* mock request */ } as Request;
    mockResponse = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;


    controller = new StocksController(mockStocksService, mockAuthService);
  });

  describe("create", () => {
    it("should create a stock and return it in the response", async () => {
      const mockPayload = { gameId: "mockGameId" };

      mockAuthService.verifyRequestForRoles = jest.fn().mockResolvedValue(mockPayload);
      const stock = Stock.create(
        "AAPL",
        "Apple Inc.",
        "Tech giant",
        100,
        "gameId123",
        [],
        1000,
        2000,
        false
      );

      const mockRequestData = { /* mock request data */ };
      const mockCreatedStock = { stock };
      mockStocksService.create = jest.fn().mockResolvedValue(mockCreatedStock);


      await controller.create(mockRequest, mockResponse);

      expect(mockAuthService.verifyRequestForRoles).toHaveBeenCalledWith(
        mockRequest,
        [Role.ADMIN, Role.PLAYER]
      );
      expect(mockStocksService.create).toHaveBeenCalledWith({
        ...mockRequestData,
        gameId: mockPayload.gameId,
      });
      expect(mockResponse.send).toHaveBeenCalledWith(mockCreatedStock);
    });
  });

  describe("create with invalid data", () => {
    it("should throw an error", async () => {
      const mockPayload = { gameId: "mockGameId" };

      mockAuthService.verifyRequestForRoles = jest.fn().mockResolvedValue(mockPayload);
      const mockRequestData = { /* mock request data */ };
      const mockCreatedStock = { stock: null };
      mockStocksService.create = jest.fn().mockResolvedValue(mockCreatedStock);

      await controller.create(mockRequest, mockResponse);

      expect(mockAuthService.verifyRequestForRoles).toHaveBeenCalledWith(
        mockRequest,
        [Role.ADMIN, Role.PLAYER]
      );
      expect(mockStocksService.create).toHaveBeenCalledWith({
        ...mockRequestData,
        gameId: mockPayload.gameId,
      });
      expect(mockResponse.send).toHaveBeenCalledWith(mockCreatedStock);
    });
  });
});
