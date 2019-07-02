import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-maps',
    templateUrl: './maps.page.html',
    styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
    lat: number;
    lng: number;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        let geo: any = this.route.snapshot.paramMap.get('geo');
        geo = geo.substr(4);
        geo = geo.split(',')

        this.lat = Number(geo[0]);
        this.lng = Number(geo[1]);

        console.log(this.lat, this.lng);
    }

}
