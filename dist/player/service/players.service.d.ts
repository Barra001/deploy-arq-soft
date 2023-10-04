import { Player } from "../entities/players.entity";
import { PlayersServiceInterface } from "./players.service.interface";
import { EncryptionServiceInterface } from "src/encryption/service/encryption.interface";
import { PlataformActivitiesServiceInterface } from "../../plataform_activity/service/plataform_activities.service.interface";
import { GamesRepositoryInterface } from "src/game/repository/games.repository.interface";
import { PlayersRepositoryInterface } from "../repository/players.repository.interface";
import { Transaction } from "./../../transactions/entities/transactions.entity";
export declare class PlayersService implements PlayersServiceInterface {
    private readonly gamesRepository;
    private readonly playersRepository;
    private readonly encryptionService;
    private readonly plataformActivitiesService;
    constructor(gamesRepository: GamesRepositoryInterface, playersRepository: PlayersRepositoryInterface, encryptionService: EncryptionServiceInterface, plataformActivitiesService: PlataformActivitiesServiceInterface);
    getPlayer(userId: string): Promise<Player>;
    create(player: Player, gameCode: string): Promise<Player>;
    find(filters?: {}): Promise<Player>;
    update(player: Player): Promise<Player>;
    validatePlayerHasStock(playerId: string, stockCode: string, stockQuanity: number): Promise<boolean>;
    addStockToPortfolio(transaction: Transaction): Promise<void>;
    private addOrCreateStockQuantity;
    private validateEmail;
    private validatePlayer;
    private validatePlayerDoesNotExists;
    private encryptPlayerPassword;
}
