"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stocks_controller_1 = require("./../stock/stocks.controller");
const auth_payload_1 = require("../auth/entities/auth.payload");
const stock_entity_1 = require("./../stock/entities/stock.entity");
describe("StocksController", () => {
    let controller;
    let mockStocksService;
    let mockAuthService;
    let mockRequest;
    let mockResponse;
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
        mockRequest = {};
        mockResponse = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        controller = new stocks_controller_1.StocksController(mockStocksService, mockAuthService);
    });
    describe("create", () => {
        it("should create a stock and return it in the response", async () => {
            const mockPayload = { gameId: "mockGameId" };
            mockAuthService.verifyRequestForRoles = jest.fn().mockResolvedValue(mockPayload);
            const stock = stock_entity_1.Stock.create("AAPL", "Apple Inc.", "Tech giant", 100, "gameId123", [], 1000, 2000, false);
            const mockRequestData = {};
            const mockCreatedStock = { stock };
            mockStocksService.create = jest.fn().mockResolvedValue(mockCreatedStock);
            await controller.create(mockRequest, mockResponse);
            expect(mockAuthService.verifyRequestForRoles).toHaveBeenCalledWith(mockRequest, [auth_payload_1.Role.ADMIN, auth_payload_1.Role.PLAYER]);
            expect(mockStocksService.create).toHaveBeenCalledWith(Object.assign(Object.assign({}, mockRequestData), { gameId: mockPayload.gameId }));
            expect(mockResponse.send).toHaveBeenCalledWith(mockCreatedStock);
        });
    });
    describe("create with invalid data", () => {
        it("should throw an error", async () => {
            const mockPayload = { gameId: "mockGameId" };
            mockAuthService.verifyRequestForRoles = jest.fn().mockResolvedValue(mockPayload);
            const mockRequestData = {};
            const mockCreatedStock = { stock: null };
            mockStocksService.create = jest.fn().mockResolvedValue(mockCreatedStock);
            await controller.create(mockRequest, mockResponse);
            expect(mockAuthService.verifyRequestForRoles).toHaveBeenCalledWith(mockRequest, [auth_payload_1.Role.ADMIN, auth_payload_1.Role.PLAYER]);
            expect(mockStocksService.create).toHaveBeenCalledWith(Object.assign(Object.assign({}, mockRequestData), { gameId: mockPayload.gameId }));
            expect(mockResponse.send).toHaveBeenCalledWith(mockCreatedStock);
        });
    });
});
//# sourceMappingURL=stocks.controller.test.js.map