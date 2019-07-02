import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

declare var mapboxgl: any;

@Component({
    selector: 'app-maps',
    templateUrl: './maps.page.html',
    styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit, AfterViewInit {
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

    ngAfterViewInit(): void {
        mapboxgl.accessToken = 'pk.eyJ1IjoibWlndWVseXVzdGl6IiwiYSI6ImNqeGx6dXV2ZDBib2Qzb3BzcG9jOTJpaDkifQ.6lm_hePv4aOb1st0Uzk-fA';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11'
        });
    }

}
