import { Injectable } from '@angular/core';
import { ActivatedRoute, Resolve, RouterStateSnapshot } from '@angular/router';

import { ServersService } from '../servers.service';
import { Observable } from 'rxjs/Observable';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class ServerResolver implements Resolve<Server> {

  constructor(private serverService: ServersService) {
  }

  resolve(route: ActivatedRoute, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    return this.serverService.getServer(Number(route.params.id));
  }
}
