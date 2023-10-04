import { StocksService } from './../stock/service/stocks.service';
import { Stock } from './../stock/entities/stock.entity';
import { StockAlreadyExistsException, StockHasActiveTransactionsException, StockInvalidPrice, UnauthorizedModificationOfStock } from './../stock/stock.exceptions';

const mockStocksRepository = {
  exists: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn(),
  save : jest.fn(),
};

const stocksService = new StocksService(mockStocksRepository);

describe('StocksService', () => {
  const stockData: Stock = Stock.create(
    'AAPL',
    'Apple Inc.',
    'Technology company',
    150.0,
    '123',
    [],
    1000,
    1000,
    false,
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new stock when it does not exist', async () => {
    mockStocksRepository.exists.mockResolvedValue(false);

    mockStocksRepository.create.mockResolvedValue(stockData);

    const createdStock = await stocksService.create(stockData);

    expect(createdStock).toEqual(stockData);

    expect(mockStocksRepository.exists).toHaveBeenCalledWith({
      code: stockData.code,
      gameId: stockData.gameId,
    });
    expect(mockStocksRepository.create).toHaveBeenCalledWith(stockData);
  });

  it('should validate and throw StockInvalidPrice when creating a stock with invalid price', async () => {
    stockData.unitValue = -100;
    const invalidStockData =  stockData;

    await expect(stocksService.create(invalidStockData)).rejects.toThrow(StockInvalidPrice);
    expect(mockStocksRepository.exists).toHaveBeenCalledWith({
      code: invalidStockData.code,
      gameId: invalidStockData.gameId,
    });
    expect(mockStocksRepository.create).not.toHaveBeenCalled();
  });

  it('should throw StockAlreadyExistsException when trying to create an existing stock', async () => {
    mockStocksRepository.exists.mockResolvedValue(true);

    await expect(stocksService.create(stockData)).rejects.toThrow(StockAlreadyExistsException);
    expect(mockStocksRepository.exists).toHaveBeenCalledWith({
      code: stockData.code,
      gameId: stockData.gameId,
    });
    expect(mockStocksRepository.create).not.toHaveBeenCalled();
  });


  it('should delete a stock when it exists and has no transactions', async () => {
    mockStocksRepository.find.mockResolvedValue(stockData);

    const result = await stocksService.delete('stockId', '123');

    expect(result).toBe('Stock deleted successfully');

    expect(mockStocksRepository.find).toHaveBeenCalledWith({ _id: 'stockId' });
    expect(mockStocksRepository.delete).toHaveBeenCalledWith('stockId');
  });

  it('should throw UnauthorizedModificationOfStock when trying to delete a stock with a different gameId', async () => {
    mockStocksRepository.find.mockResolvedValue({
      ...stockData,
      gameId: '456',
    });

    await expect(stocksService.delete('stockId', '123')).rejects.toThrow(UnauthorizedModificationOfStock);
    expect(mockStocksRepository.find).toHaveBeenCalledWith({_id: 'stockId'});
    expect(mockStocksRepository.delete).not.toHaveBeenCalled();
  });

  it('should throw StockHasActiveTransactionsException when trying to delete a stock with transactions', async () => {
    mockStocksRepository.find.mockResolvedValue({
      ...stockData,
      hasTransactions: true,
    });

    await expect(stocksService.delete('stockId', '123')).rejects.toThrow(StockHasActiveTransactionsException);
    expect(mockStocksRepository.find).toHaveBeenCalledWith({_id: 'stockId'});
    expect(mockStocksRepository.delete).not.toHaveBeenCalled();
  });

  it('should find a stock with given filters', async () => {
    mockStocksRepository.find.mockResolvedValue(stockData);

    const filters = { code: 'AAPL', gameId: '123' };
    const foundStock = await stocksService.find(filters);

    expect(foundStock).toEqual(stockData);
    expect(mockStocksRepository.find).toHaveBeenCalledWith(filters);
  });

  it('should find all stocks with filters and pagination', async () => {
    const filters = {
      gameId: '123',
      query: 'Tech',
      skip: 0,
      limit: 10,
    };

    mockStocksRepository.findAll.mockResolvedValue([stockData]);

    const foundStocks = await stocksService.findAll(filters);

    expect(foundStocks).toEqual([stockData]);
    expect(mockStocksRepository.findAll).toHaveBeenCalledWith(
      { gameId: '123', $or: expect.any(Array) },
      0,
      10
    );
  });
});
