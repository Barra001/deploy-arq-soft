import { Game } from "../entities/game.entity";
import {
  GameInvalidCode,
  GameInconsistentDates,
  GameInsertDates,
} from "../games.exceptions";

import { PlataformActivitiesServiceInterface } from "../../plataform_activity/service/plataform_activities.service.interface";
import { LogType } from "../../plataform_activity/entities/log-event";
import { GamesRepositoryInterface } from "src/game/repository/games.repository.interface";
import { GamesServiceInterface } from "./games.service.interface";
import { AdminsServiceInterface } from "src/admins/service/admins.service.interface";

export class GamesService implements GamesServiceInterface {
  constructor(
    private readonly gamesRepository: GamesRepositoryInterface,
    private readonly plataformActivitiesService: PlataformActivitiesServiceInterface,
    private readonly adminService: AdminsServiceInterface
  ) {}
  async findById(id: string): Promise<Game> {
    return this.gamesRepository.findById(id);
  }

  async create(game: Game, creator: string, adminId: string): Promise<Game> {
    this.validateCodes(game.codesToUse);
    this.validateGameDates(game);
    const gameCreated = await this.gamesRepository.create(game);
    await this.plataformActivitiesService.create(
      "Game created",
      creator,
      LogType.info
    );
    await this.adminService.asignGameIdToAdmin(
      adminId,
      gameCreated.id.toString()
    );

    return gameCreated;
  }

  private validateGameDates(game: Game): void {
    const today: Date = new Date();
    if (!game.startDate || !game.endDate) throw new GameInsertDates();
    const eventStartDate = new Date(game.startDate);
    const eventEndDate = new Date(game.endDate);
    if (eventStartDate > eventEndDate) throw new GameInconsistentDates();
    if (eventStartDate < today) throw new GameInconsistentDates();
  }

  private validateCodes(codes: string[]): void {
    codes.forEach((code) => {
      if (!this.gameCodeValidator(code)) throw new GameInvalidCode();
    });
  }

  private gameCodeValidator = (code: string): boolean => {
    return /^[a-zA-Z0-9]{8}$/.test(code);
  };

  async getAll(): Promise<Game[]> {
    return this.gamesRepository.getAll();
  }
}
