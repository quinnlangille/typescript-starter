import { injectable, inject } from 'inversify';
import { Logger } from '../utils/Logger';

interface Status {
   time: number;
   requestID: string;
}

@injectable()
export class StatusService {
    public async getStatus(requestId: string): Promise<Status> {
        return {
           time: Date.now(),
           requestID: requestId,
        }
    }
}
