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
            style: 'mapbox://styles/mapbox/light-v10',
            center: [this.lng, this.lat],
            zoom: 15.5,
            pitch: 45,
            bearing: -17.6,
            container: 'map'
        });

        map.on('load', () => {
// Insert the layer beneath any symbol layer.
            map.resize();

            //MARKER

            new mapboxgl.Marker()
                .setLngLat([this.lng, this.lat])
                .addTo(map);



            var layers = map.getStyle().layers;

            var labelLayerId;
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                    labelLayerId = layers[i].id;
                    break;
                }
            }

            map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',

// use an 'interpolate' expression to add a smooth transition effect to the
// buildings as the user zooms in
                    'fill-extrusion-height': [
                        "interpolate", ["linear"], ["zoom"],
                        15, 0,
                        15.05, ["get", "height"]
                    ],
                    'fill-extrusion-base': [
                        "interpolate", ["linear"], ["zoom"],
                        15, 0,
                        15.05, ["get", "min_height"]
                    ],
                    'fill-extrusion-opacity': .6
                }
            }, labelLayerId);
        });
    }

}
