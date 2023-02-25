import { Component, OnInit } from '@angular/core';
import { faDashboard, faLocation, faBox, faShop } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  faDashboard=faDashboard
  faLocation=faLocation
  faBox=faBox
  faShop=faShop


}

