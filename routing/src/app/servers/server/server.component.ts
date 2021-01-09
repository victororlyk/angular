import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.server = data.server;
    })
    // const id = this.route.snapshot.params.id;
    // this.server = this.serversService.getServer(Number(id));
    // this.route.params.subscribe((params: Params) => {
    //   console.log(params, 'here')
    //   this.server = this.serversService.getServer(Number(params.id));
    // });
  }

  onEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

}
