import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, UrlTree } from '@angular/router';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams.allowEdit === '1' ? true : false;
    });
    this.route.fragment.subscribe(fragment => {
    });
    const id = this.route.snapshot.params.id;
    this.server = this.serversService.getServer(Number(id));
    this.route.params.subscribe(params => {
      this.serversService.getServer(Number(params.id));
    });
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard changes');
    } else {
      return true;
    }
  }

}
