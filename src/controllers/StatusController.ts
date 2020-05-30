import { inject, named } from "inversify";
import { BadRequestError } from "../entities/Errors/BadRequest";
import { controller, httpGet, interfaces } from "inversify-express-utils";
import { Logger, LogLevel } from "../utils/Logger";
import { StatusService } from "../services/StatusService";

@controller("/status")
export class StatusController implements interfaces.Controller {
  constructor(
    @inject("service") @named("status") private service: StatusService,
    @inject("logger") private logger: Logger
  ) {}

  @httpGet("/")
  public async getStatus(req: any, res: any) {
    req.id = this.logger.generateRequestId();
    const result = await this.service.getStatus(req.id);

    res.status(200).send(result);
  }
}
